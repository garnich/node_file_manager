import { homedir, EOL } from 'os';
import { stdout } from 'process';

const getUserName = (args) => {
    const userName = args.slice(2).reduce(
        (acc, key) => {
            if(/^--username/.test(key)) {
                const values = key.split('=');

                acc['data'] = values[1] 
            }
            
        return acc
    }, {});

    return userName.data;
}

const getHomeDir = () => {
    return homedir();
}

const getCurrendDirMsg = (dir) => {
    return `You are currently in => ${dir} ${EOL}`
}

const getPathToFile = (str) => {
    const pathArr = str.split('/');
    if( pathArr.length > 1){
        pathArr.length = pathArr.length -1;
        return pathArr.join('/');
    }

    return null;
};

const getCpuInfo = (cpuArr) => {
    stdout.write(`AMOUNT OF CPUS: ${cpuArr.length}${EOL}`);
    stdout.write(`${EOL}`);


    cpuArr.map((cpu) => {
        stdout.write(`CPU MODEL: ${cpu.model}${EOL}`);
        stdout.write(`CPU CLOCK RATE: ${cpu.speed / 1000} GHz${EOL}`);
        stdout.write(`${EOL}`);
    })
}

export { getUserName, getHomeDir, getCurrendDirMsg, getPathToFile, getCpuInfo };
