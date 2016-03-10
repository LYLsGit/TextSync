'use strict';
function rolling_checksum(data, last) {
  const length = data.length;
  const M = Math.pow(2, 32);
  let a = 0;
  let b = 0;
  if (last) {
    a = (last.a - last.data[0] + data[length-1]) % M;
    b = (last.b - (length) * last.data[0] + a) % M;
  } else {
    for (var i = 0; i + 1 <= length; i++) {
      a = (a + data[i]);
      b = b + ((length - i) * data[i]);
    }
    a = a % M;
    b = b % M;
  }
  return  {data: data, a: a, b: b, s: (a + M * b)};
};
module.exports = rolling_checksum;
