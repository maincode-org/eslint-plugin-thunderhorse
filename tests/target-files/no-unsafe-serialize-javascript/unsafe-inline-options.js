const serialize = require('serialize-javascript');

const obj = { a: 'some string', b: false };
serialize(obj, { unsafe: true });
