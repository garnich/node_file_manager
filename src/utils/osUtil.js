import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { cwd, stdout } from 'process';
import { getCpuInfo } from '../helpers/commonHelpers.js';
import {
    INAVALID_INPUT,
    OPERATION_FAILED,
    OS_VALUES,
} from '../constants/index.js';
import { getCurrendLocationMsg } from '../helpers/commonHelpers.js';

const osUtil = (command) => {
    const commandArr = command.trim().split(' ');

    if (commandArr.length !== 2) {
        stdout.write(`${OPERATION_FAILED} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        const flag = command.split(' ')[1].toUpperCase();

        switch (flag) {
            case `--${OS_VALUES.EOL}`:
                stdout.write(`${JSON.stringify(EOL)}${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
                break;
            case `--${OS_VALUES.CPUS}`:
                getCpuInfo(cpus());
                stdout.write(getCurrendLocationMsg(cwd()));
                break;
            case `--${OS_VALUES.HOMEDIR}`:
                stdout.write(
                    `${OS_VALUES.HOMEDIR} => ${JSON.stringify(homedir())}${EOL}`
                );
                stdout.write(getCurrendLocationMsg(cwd()));
                break;
            case `--${OS_VALUES.USERNAME}`:
                stdout.write(
                    `${OS_VALUES.USERNAME} => ${JSON.stringify(
                        userInfo().username
                    )}${EOL}`
                );
                stdout.write(getCurrendLocationMsg(cwd()));
                break;
            case `--${OS_VALUES.ARCHITECTURE}`:
                stdout.write(
                    `${OS_VALUES.ARCHITECTURE} => ${JSON.stringify(
                        arch()
                    )}${EOL}`
                );
                stdout.write(getCurrendLocationMsg(cwd()));
                break;
            default:
                stdout.write(`${INAVALID_INPUT}${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
        }
    }
};

export { osUtil };
