const vm = require('node:vm');
const userInput = prompt('Specify script');
vm.runInThisContext(userInput);