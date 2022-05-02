const userInput = prompt("Specify exec command");

require('child_process').exec(userInput);