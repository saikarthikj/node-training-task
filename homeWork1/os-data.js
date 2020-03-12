const os = require('os');
const cpuCount = os.cpus().length;
console.log(`Node version is ${process.version}`);
console.log(`No of cores in CPU is  ${cpuCount}`);