const readline = require('readline');
const args = process.argv.slice(2);

const rl = readline.createInterface({
    input: process.stdin
});
const sortAsc = (result, item) => {
    item = +item;
    const length = result.length;
    if (!length || (length && item >= result[length -1])) {
        result.push(item);
    } else if (item <= result[0]){
        result.unshift(item);
    } else {
        const middle = Math.floor(length / 2);
        const part1 = result.slice(0, middle);
        const part2 = result.slice(middle, length);
        if (item <= part1[part1.length - 1] || item <= part2[0]) {
            result = sortAsc(part1, item).concat(part2);
        } else if (item >= part2[0]) {
            result = part1.concat(sortAsc(part2, item));
        }
    }
    return result;
}
const sortDesc = (result, item) => {
    item = +item;
    const length = result.length;
    if (!length || (length && item <= result[length -1])) {
        result.push(item);
    } else if (item >= result[0]){
        result.unshift(item);
    } else {
        const middle = Math.floor(length / 2);
        const part1 = result.slice(0, middle);
        const part2 = result.slice(middle, length);
        if (item <= part1[part1.length - 1] || item <= part2[0]) {
            result = part1.concat(sortDesc(part2, item));
        } else if (item >= part2[0]) {
            result = sortDesc(part1, item).concat(part2);
        }
    }
    return result;
}
rl.on('line', (data) => {
    let mode = 'asc';
    if (args.length) {
        const flag = args.find(item =>  item.indexOf('mode') >= 0);
        mode = (flag) ?  flag.split('=')[1] : 'asc'    
    }
    const array = data.replace(/ /g, ',').split(',').reduce(mode === 'asc'? sortAsc: sortDesc, []);
    console.log(`The ${mode} is ${array}`);
});