const mySerializer = require('serialize-javascript');

const obj = { a: 'some string', b: false };
mySerializer(obj, { unsafe: false });