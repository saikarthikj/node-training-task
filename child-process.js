const { spawn } = require('child_process'); 
const p = spawn('node', ['os-data.js']);
p.stdout.on('data', function (data) {  
    console.log(data.toString());  
});