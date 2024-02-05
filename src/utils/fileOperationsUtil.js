import { resolve } from 'path';
import { getCurrendLocationMsg } from '../helpers/commonHelpers.js';
import { INAVALID_INPUT } from '../constants/index.js';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';
import { createReadStream } from 'node:fs';
import { pipeline } from 'stream/promises';

const catUtil = async (command) => {
    const commandArr = command.split(' ');
   
    if(commandArr.length > 2) {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        try {
            const readStream = createReadStream(resolve(commandArr[1]));

            await pipeline(readStream, process.stdout,  { end: false });
        } catch  (error){
            stdout.write(`${INAVALID_INPUT} ${error} ${EOL}`);
        } finally {
            stdout.write(`${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }
}};

export { catUtil }