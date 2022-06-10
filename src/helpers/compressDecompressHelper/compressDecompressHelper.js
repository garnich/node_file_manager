import { createReadStream, createWriteStream, access, constants } from 'fs';
import { getCurrendDirMsg } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

const compressHelper = (command) => {
    const commandArr = command.split(' ');
    const isCommandArrLenghtNotValid = commandArr.length !== 3;
    const outputFileExtention = !isCommandArrLenghtNotValid && commandArr[2].split('.').pop();

    if(isCommandArrLenghtNotValid || outputFileExtention !== 'br') {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {

        access(commandArr[1], constants.F_OK, (err) => {
            if(err) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(commandArr[2], constants.F_OK, (err) => {

                    if (err && err.code === 'ENOENT') {

                        const readFileStream = createReadStream(commandArr[1]);
                            readFileStream
                                .pipe(createBrotliCompress())
                                .pipe(createWriteStream(commandArr[2]))
                                .on('finish', () => {
                                    stdout.write(`File COMPRESSED ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                })
                    } else {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    }
                });
            }
        })
    }
};

const decompressHelper = (command) => {
    const commandArr = command.split(' ');
    const isCommandArrLenghtNotValid = commandArr.length !== 3;
    const inputFileExtention = !isCommandArrLenghtNotValid && commandArr[1].split('.').pop();
    
    if(isCommandArrLenghtNotValid && inputFileExtention === 'br') {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {

        access(commandArr[1], constants.F_OK, (err) => {
            if(err) {

                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(commandArr[2], constants.F_OK, (err) => {

                    if (err && err.code === 'ENOENT') {

                        const readFileStream = createReadStream(commandArr[1]);
                            readFileStream
                                .pipe(createBrotliDecompress())
                                .pipe(createWriteStream(commandArr[2]))
                                .on('finish', () => {
                                    stdout.write(`File DECOMPRESSED ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                })
                    } else {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    }
                });
            }
        })
    }
};

export { compressHelper, decompressHelper };
