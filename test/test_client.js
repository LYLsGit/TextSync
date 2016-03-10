'use strict';
var client = require('../client');
var checksum = require('../checksum');
var md5 = require('../md5');
var fs = require('fs');

fs.readFile('../test_c.txt', (err, data0) => {
  fs.readFile('../text_s.txt', (err, data1) => {
    var chunk0 = client.toChunk(data0);
    var hashMap = new Array();
    for (var i = 0; i < chunk0.length; i++) {
      hashMap[chunk0[i].r] = chunk0[i];
    }
    var rsum = null;
    for (var i = 0, j = 0; i < data1.length; i++) {
      var data = data1.slice(i, i + 16);
      rsum = checksum(data, rsum);
      if (hashMap[rsum.s]) {
        var match = hashMap[rsum.s];
        var sKey = md5(data);
        if (sKey === match.s) {
          rsum = null;
          match.find = true;
          match.pos = i;
          i = i + 15;
        }
      }
    }
    var result = [];
    for (var i in hashMap) {
      var entry = hashMap[i];
      if (entry.find) {
        result[entry.id] = {id:entry.id, pos: entry.pos, data: null};
      } else {
        result[entry.id] = {id:entry.id, pos: null, data: entry.data.toString('ascii')};
      }
    }
    console.log(result);
    var str = '';
    for (var i in result) {
      if (result[i].pos !== null) {
        str += data1.slice(result[i].pos, result[i].pos + 16);
      } else if (result[i].data) {
        str += result[i].data;
      }
    }
    console.log(str);
  });
});
