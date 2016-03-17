/*
 * Text Synchronize from
 * http://www.cs.cmu.edu/~15-749/READINGS/required/cas/tridgell96.pdf
 *
 * Copyright 2016, tajpure
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */
'use strict';
let md5 = require('./md5');
let Checksum = require('./checksum');

module.exports = {
  dist : null,
  ChunkSize : 32,
  sync : function (source) {
    let chunks = this.cmp(source, this.dist);
    this.dist = source;
    return chunks;
  },
  toChunks : function (source) {
    let chunks = new Array();
    for (let i = 0, j = 0; i < source.length; i += this.ChunkSize, j++) {
      let data = source.slice(i, i + this.ChunkSize);
      let rChecksum = Checksum.checksum(data, true);
      let sChecksum = md5(data);
      chunks[j] = {id:j, r: rChecksum, s: sChecksum, data: data};
    }
    return chunks;
  },
  cmp : function (source, dist) {
    let chunks = this.toChunks(source);
    let hashMap = [];
    let result = [];
    for (let i = 0; i < chunks.length; i++) {
      hashMap[chunks[i].r] = chunks[i];
    }
    if (dist) {
      for (let i = 0; i < dist.length; i++) {
        let data = dist.slice(i, i + this.ChunkSize);
        let rChecksum = Checksum.checksum(data);
        if (hashMap[rChecksum]) {
          let chunk = hashMap[rChecksum];
          let sKey = md5(data);
          if (sKey === chunk.s) {
            chunk.find = true;
            chunk.pos = i;
            i = i + this.ChunkSize - 1;
          }
        }
      }
    }
    for (let i in hashMap) {
      let chunk = hashMap[i];
      if (chunk.find) {
        result[chunk.id] = {id:chunk.id, pos: chunk.pos, data: null};
      } else {
        result[chunk.id] = {id:chunk.id, pos: null, data: chunk.data.toString('ascii')};
      }
    }
    return result;
  }
};
