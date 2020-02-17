const { spawn } = require('child_process'); 
const p = spawn('node', ['homeWork1/os-data.js']);
p.stdout.on('data', function (data) {  
    console.log(data.toString());  
});