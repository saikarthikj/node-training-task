const { spawn } = require('child_process'); 
const childProcess = spawn('node', ['homeWork1/os-data.js']);
childProcess.stdout.on('data', function (data) {  
    console.log(data.toString());  
});
