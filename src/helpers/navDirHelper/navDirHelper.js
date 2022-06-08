import { readdir } from 'fs';
import { join } from 'path';
import { getCurrendDirMsg } from '../../utils/commonUtils';
import { cwd, chdir, stdout } from 'process';
import { EOL } from 'os';

const lsHelper = () => {
    const dirname = cwd();
    
    readdir(join(dirname), ((err, files) => {
        if(err) throw err
        files.forEach((item) => console.log(item))

        stdout.write(EOL);

        stdout.write(getCurrendDirMsg(dirname));
    }))
};

const upHelper = () => {
    try {
        chdir('../');
        stdout.write(getCurrendDirMsg(cwd()));
    } catch (err) {
        stdout.write(`Operation failed (${err}) ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    }
};

const cdHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        return stdout.write(`Operation failed ${EOL}`);
    }

    try {
        chdir(commandArr[1]);
        stdout.write(getCurrendDirMsg(cwd()));
     } catch (err) {
        stdout.write(`Operation failed (${err}) ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
     }
}

export { lsHelper, upHelper, cdHelper };
