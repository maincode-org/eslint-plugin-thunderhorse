const { exec } = require('child_process');

const userInput = prompt("Specify exec command");

exec(userInput);