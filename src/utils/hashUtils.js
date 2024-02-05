import { EOL } from 'node:os';
import { createHash } from 'crypto';
import { createReadStream } from 'node:fs';
import { cwd, stdout } from 'process';
import { getCurrendLocationMsg } from '../helpers/commonHelpers.js';
import { resolve } from 'path';

const hashUtil = (command) => {
    const commandArr = command.split(' ');

    if (commandArr.length !== 2) {
        stdout.write(`${OPERATION_FAILED} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        try {
            const readStream = createReadStream(resolve(commandArr[1]));
            const hash = createHash('sha256');

            readStream.pipe(hash).on('finish', () => {
                stdout.write(
                    `${commandArr[1]} hash => ${hash.digest('hex')} ${EOL}`
                );
                stdout.write(getCurrendLocationMsg(cwd()));
            });
        } catch (err) {
            stdout.write(`${OPERATION_FAILED} ${err} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }
    }
};

export { hashUtil };
