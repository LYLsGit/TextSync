'use strict';
let client = require('./client');
let server = require('./server');

let chunks = client.sync('From far, from eve and morning. And yon twelve-winded sky, the stuff of life to knit me. Blew hither: here am I.');

console.log(chunks);
console.log(server.update(chunks));

chunks = client.sync('From far, from eve and morning. And yon twelve-winded sky, the stuff of life to knit me. Now for a breath I tarry nor yet disperse apart. Take my hand quick and tell me, what have you in your heart. Speak now, and I will answer. how shall I help you...say... Ere to the wind’s twelve quarters. I take my endless way.');

console.log(chunks);
console.log(server.update(chunks));

chunks = client.sync('From far, from eve and morning. And yon twelve-winded sky, the stuff of life to knit me. Blew hither: here am I. Now for a breath I tarry nor yet disperse apart. Take my hand quick and tell me, what have you in your heart. Speak now, and I will answer. how shall I help you...say... Ere to the wind’s twelve quarters. I take my endless way.');

console.log(chunks);
console.log(server.update(chunks));
