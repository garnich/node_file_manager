import { createReadStream, createWriteStream, access, constants } from 'fs';
import { getCurrendDirMsg } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import { resolve, join } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

const compressHelper = (command) => {
    const commandArr = command.split(' ');
    const isCommandArrLenghtNotValid = commandArr.length !== 3;
    const fileName = commandArr[1].split('/').pop();

    if(isCommandArrLenghtNotValid) {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {

        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if(err) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(resolve(commandArr[2], `${fileName}.br`), constants.F_OK, (err) => {

                    if (err && err.code === 'ENOENT') {
                            const readFileStream = createReadStream(resolve(commandArr[1]));
                            
                            readFileStream
                            .pipe(createBrotliCompress())
                            .pipe(createWriteStream(resolve(join(commandArr[2], `${fileName}.br`))))
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
    const outputFileName = !isCommandArrLenghtNotValid && commandArr[1].split('.').splice(0, 2).join('.');

    if(isCommandArrLenghtNotValid && inputFileExtention !== 'br') {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {

        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if(err) {

                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(join(commandArr[2], outputFileName), constants.F_OK, (err) => {

                    if (err && err.code === 'ENOENT') {

                        const readFileStream = createReadStream(resolve(commandArr[1]));
                            readFileStream
                                .pipe(createBrotliDecompress())
                                .pipe(createWriteStream(join(commandArr[2], outputFileName)))
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
