const vm = require('node:vm');
const userInput = prompt('Specify script');
const script = new vm.Script(userInput);
script.runInThisContext();
