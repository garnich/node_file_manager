import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { cwd, stdout } from 'process';
import { getCurrendDirMsg, getCpuInfo } from '../../utils/commonUtils';

const osHelper = (command) => {
    const commandArr = command.trim().split(' ');

    if(commandArr.length !==2){
        stdout.write(`Operation failed ${EOL}`)
        stdout.write(getCurrendDirMsg(cwd()));
    } else {
        const flag = command.split(' ')[1].toUpperCase();
        
        switch(flag) {
            case '--EOL':
                stdout.write(`${JSON.stringify(EOL)}${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
                break;
            case '--CPUS':
                getCpuInfo(cpus());
                stdout.write(getCurrendDirMsg(cwd()));
                break;
            case '--HOMEDIR':
                stdout.write(`HOMEDIR => ${JSON.stringify(homedir())}${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
                break;
            case '--USERNAME':
                stdout.write(`USERNAME => ${JSON.stringify(userInfo().username)}${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
                break;architecture
            case '--ARCHITECTURE':
                stdout.write(`ARCHITECTURE => ${JSON.stringify(arch())}${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            break;
            default:
                console.log('Invalid input');
        }
    }
};

export { osHelper };
