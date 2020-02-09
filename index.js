const readline = require('readline');
const args = process.argv.slice(2);

const rl = readline.createInterface({
    input: process.stdin
});
rl.on('line', (data) => {
    let mode = 'asc';
    if (args.length) {
        const flag = args.find(item =>  item.indexOf('mode') >= 0);
        mode = (flag) ?  flag.split('=')[1] : 'asc'    
    }
    const array = data.replace(/ /g, ',').split(',').sort((a, b) =>{   
        if (+a > +b) {
             return mode === 'asc' ? 1 : -1;
        } else if (+a < +b) {
            return mode === 'asc' ? -1 : 1;
        }else {
            return 0;
        }
    });
    console.log(`The ${mode} is ${array}`);
});