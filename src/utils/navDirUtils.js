import { resolve } from 'path';
import { getCurrendLocationMsg } from '../helpers/commonHelpers.js';
import { OPERATION_FAILED } from '../constants/index.js';
import { cwd, chdir, stdout } from 'process';
import { EOL } from 'node:os';
import { readdir } from 'node:fs';

const upUtil = () => {
    try {
        chdir(resolve('../'));
        stdout.write(getCurrendLocationMsg(cwd()));
    } catch (err) {
        stdout.write(`${OPERATION_FAILED} (${err}) ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    }
};

const cdUtil = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        stdout.write(`${OPERATION_FAILED} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    }

    try {
        chdir(resolve(commandArr[1]));
        stdout.write(getCurrendLocationMsg(cwd()));
     } catch (err) {
        stdout.write(`${OPERATION_FAILED} (${err}) ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
     }
};

const lsUtil = () => {
    const dirname = cwd();
    
    readdir(resolve(dirname), { withFileTypes: true }, ((err, files) => {
        if(err) {
            stdout.write(`${OPERATION_FAILED} (${err}) ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }

        const data = files.map((dirent) => ({ 'name': dirent.name, 'type': dirent.isDirectory() ? 'directory' : 'file' }));

        console.table(data);

        stdout.write(EOL);
        stdout.write(getCurrendLocationMsg(dirname));
    }))
};

export { upUtil, cdUtil, lsUtil }