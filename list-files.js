const args = process.argv.slice(2);
const { exec } = require('child_process');
const path = args[0];
exec('dir',{cwd: path},  (error, stdout, stderr) =>  {
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