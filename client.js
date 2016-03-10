var md5 = require('./md5');
var checksum = require('./checksum');

module.exports = {
  source : null,
  buffer : null,
  toChunk : function(source) {
    var result = new Array();
    for (var i = 0, j = 0; i < source.length; i += 16, j++) {
      var data = source.slice(i, i + 16);
      var rChecksum = checksum(data);
      var sChecksum = md5(data);
      result[j] = {id:j, r: rChecksum.s, s: sChecksum, data: data};
    }
    return result;
  },
  cmp : function(source0, source1) {

  },
  sync : function(source) {
    if (this.source === null) {

    } else {

    }
  }
}
