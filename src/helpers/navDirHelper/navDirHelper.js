import { readdir } from 'fs';
import { resolve } from 'path';
import { getCurrendDirMsg } from '../../utils/commonUtils';
import { cwd, chdir, stdout } from 'process';
import { EOL } from 'os';

const lsHelper = () => {
    const dirname = cwd();
    
    readdir(resolve(dirname), ((err, files) => {
        if(err) throw err
        files.forEach((item) => console.log(item))

        stdout.write(EOL);
        stdout.write(getCurrendDirMsg(dirname));
    }))
};

const upHelper = () => {
    try {
        chdir(resolve('../'));
        stdout.write(getCurrendDirMsg(cwd()));
    } catch (err) {
        stdout.write(`Operation failed (${err}) ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    }
};

const cdHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        stdout.write(`Operation failed ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    }

    try {
        chdir(resolve(commandArr[1]));
        stdout.write(getCurrendDirMsg(cwd()));
     } catch (err) {
        stdout.write(`Operation failed (${err}) ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
     }
}

export { lsHelper, upHelper, cdHelper };
