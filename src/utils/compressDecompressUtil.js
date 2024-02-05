import { createReadStream, createWriteStream } from 'node:fs';
import {
    getCurrendLocationMsg,
    getPathToFile,
} from '../helpers/commonHelpers.js';
import { INAVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';
import { resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

const compressUtil = (command) => {
    const commandArr = command.split(' ');
    const isCommandArrLenghtNotValid = commandArr.length !== 3;
    const fileName = commandArr[1].split('/').pop();

    if (isCommandArrLenghtNotValid) {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        try {
            const readStream = createReadStream(resolve(commandArr[1]));
            const writeStream = createWriteStream(
                resolve(commandArr[2], `${fileName}.br`)
            );
            const compressStream = createBrotliCompress();

            readStream
                .pipe(compressStream)
                .pipe(writeStream)
                .on('finish', () => {
                    stdout.write(`File COMPRESSED ${EOL}`);
                    stdout.write(getCurrendLocationMsg(cwd()));
                });
        } catch (err) {
            stdout.write(`${OPERATION_FAILED} ${err} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }
    }
};

const decompressUtil = (command) => {
    const commandArr = command.split(' ');
    const isCommandArrLenghtNotValid = commandArr.length !== 3;
    const fileName = commandArr[1].split('/').pop();

    const inputFileExtention =
        !isCommandArrLenghtNotValid && commandArr[1].split('.').pop();
    const outputFileName =
        !isCommandArrLenghtNotValid &&
        commandArr[1].split('.').splice(0, 2).join('.');

    if (isCommandArrLenghtNotValid && inputFileExtention !== 'br') {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        try {
            const readStream = createReadStream(resolve(commandArr[1]));
            const writeStream = createWriteStream(
                resolve(commandArr[2], outputFileName)
            );
            const decompressStream = createBrotliDecompress();

            readStream
                .pipe(decompressStream)
                .pipe(writeStream)
                .on('finish', () => {
                    stdout.write(`File DECOMPRESSED ${EOL}`);
                    stdout.write(getCurrendLocationMsg(cwd()));
                });
        } catch (err) {
            stdout.write(`${OPERATION_FAILED} ${err} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }
    }
};

export { compressUtil, decompressUtil };
