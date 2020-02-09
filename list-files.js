const fs = require('fs');
const args = process.argv.slice(2);
if (args.length) {
    const path = args[0];
    fs.readdir(path , (err, items) => {
        if (err) {
            if(err.code === 'ENOTDIR'){
                console.log('Not a directory');
            } else if (err.code === 'ENOENT') {
                console.log('No such directory');
            } else {
                console.log(err);
            }
        } else {
            console.log(`Files from ${path}`);
            items.forEach(file => {
                console.log(`${path}\\${file}`);
            });
        }
    });
} else {
    console.log('Required Dir path to list the files')
}