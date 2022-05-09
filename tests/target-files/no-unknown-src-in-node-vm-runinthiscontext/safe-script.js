const vm = require('node:vm');
const script = new vm.Script('globalVar += 1');
script.runInThisContext();
