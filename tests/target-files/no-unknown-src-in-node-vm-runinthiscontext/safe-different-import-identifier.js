const myVM = require('node:vm');
myVM.runInThisContext('const local = 42;');
