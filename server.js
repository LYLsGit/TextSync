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
module.exports = {
  dist: null,
  ChunkSize: 32,
  update: function(chunks) {
    let result = '';
    for (let i in chunks) {
      if (chunks[i].pos !== null) {
        result += this.dist.slice(chunks[i].pos, chunks[i].pos + this.ChunkSize);
      } else if (chunks[i].data) {
        result += chunks[i].data;
      }
    }
    this.dist = result;
    return result;
  }
}
