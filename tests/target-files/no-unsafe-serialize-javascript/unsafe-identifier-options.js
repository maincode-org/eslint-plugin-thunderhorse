const serialize = require('serialize-javascript');

const obj = { a: 'some string', b: false };
const options = { unsafe: true };
serialize(obj, options);
