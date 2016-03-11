/*
 * Rolling Checksum from
 * http://www.cs.cmu.edu/~15-749/READINGS/required/cas/tridgell96.pdf
 *
 * Copyright 2011, tajpure
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */
'use strict';

module.exports = {
  last: null,
  checksum: function (data, isNotRolling) {
    const buffer = new Buffer(data);
    const length = buffer.length;
    const M = Math.pow(2, 32);
    let a = 0;
    let b = 0;
    let last = this.last;
    if (last && !isNotRolling) {
      a = (last.a - last.buffer[0] + buffer[length-1]) % M;
      b = (last.b - length * last.buffer[0] + a) % M;
      last = {buffer: buffer, a: a, b: b, s: (a + M * b)};
      this.last = last;
    } else {
      for (let i = 0; i + 1 <= length; i++) {
        a = (a + buffer[i]);
        b = b + ((length - i) * buffer[i]);
      }
      a = a % M;
      b = b % M;
      last = {buffer: buffer, a: a, b: b, s: (a + M * b)};
    }
    return last.s;
  }
};
