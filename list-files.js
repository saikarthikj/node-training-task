const os = require('os');
const { exec } = require('child_process');
const args = process.argv.slice(2);
const path = args[0];
exec(os.platform() ==='win32'? 'dir' : 'ls -l',{cwd: path},  (error, stdout, stderr) =>  {
    if (error) {
        if (error.code === 'ENOENT') {
            console.log('No such directory');
        } else {
            console.log(error);
        }
    } else {
        console.log(stdout);
    }
});