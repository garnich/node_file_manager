import { resolve, join } from 'path';
import {
    getCurrendLocationMsg,
    getPathToFile,
} from '../helpers/commonHelpers.js';
import {
    INAVALID_INPUT,
    FILE_EXIST,
    OPERATION_FAILED,
    RENAMED,
    COPIED,
    MOVED,
} from '../constants/index.js';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';
import { createReadStream, writeFile, access, F_OK, rename, rm } from 'node:fs';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

const catUtil = async (command) => {
    const commandArr = command.split(' ');

    if (commandArr.length > 2) {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        try {
            const readStream = createReadStream(resolve(commandArr[1]));

            await pipeline(readStream, process.stdout, { end: false });
        } catch (error) {
            stdout.write(`${INAVALID_INPUT} ${error} ${EOL}`);
        } finally {
            stdout.write(`${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
        }
    }
};

const addUtil = (command) => {
    const commandArr = command.split(' ');

    if (commandArr.length > 2) {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        access(resolve(commandArr[1]), F_OK, async (err) => {
            if (err) {
                try {
                    await writeFile(
                        resolve(commandArr[1]),
                        '',
                        { flag: 'wx' },
                        (err) => {
                            if (err) {
                                return err;
                            } else {
                                stdout.write(`Created ${commandArr[1]}${EOL}`);
                                stdout.write(getCurrendLocationMsg(cwd()));
                            }
                        }
                    );
                } catch (error) {
                    stdout.write(`${INAVALID_INPUT} ${error} ${EOL}`);
                    stdout.write(getCurrendLocationMsg(cwd()));
                }
            } else {
                stdout.write(`${INAVALID_INPUT} ${FILE_EXIST} ${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
            }
        });
    }
};

const rnUtil = (command) => {
    const commandArr = command.split(' ');
    const destination = getPathToFile(resolve(commandArr[1]));

    if (destination || commandArr.length !== 3) {
        access(resolve(commandArr[1]), F_OK, (err) => {
            if (err) {
                stdout.write(`${INAVALID_INPUT} ${err} ${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
            } else {
                access(resolve(destination, commandArr[2]), F_OK, (err) => {
                    if (!err) {
                        stdout.write(`${INAVALID_INPUT} ${EOL}`);
                        stdout.write(getCurrendLocationMsg(cwd()));
                    } else {
                        rename(
                            resolve(commandArr[1]),
                            join(destination, commandArr[2]),
                            (err) => {
                                if (err) {
                                    stdout.write(`${OPERATION_FAILED} ${EOL}`);
                                    stdout.write(getCurrendLocationMsg(cwd()));
                                }

                                stdout.write(
                                    `${RENAMED}:  ${commandArr[1]} => ${destination}/${commandArr[2]}${EOL}`
                                );
                                stdout.write(getCurrendLocationMsg(cwd()));
                            }
                        );
                    }
                });
            }
        });
    } else {
        stdout.write(`${OPERATION_FAILED} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    }
};

const cpUtil = (command, isHelper = false) => {
    const commandArr = command.split(' ');
    const destination = getPathToFile(resolve(commandArr[2]));
    const fileName = commandArr[1].split('/').pop();

    if (destination || commandArr.length !== 3) {
        access(resolve(commandArr[1]), F_OK, (err) => {
            if (err) {
                stdout.write(`${INAVALID_INPUT} ${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
            } else {
                try {
                    const readStream = createReadStream(resolve(commandArr[1]));
                    const writeStream = createWriteStream(
                        resolve(commandArr[2], fileName)
                    );

                    readStream.pipe(writeStream);

                    !isHelper &&
                        stdout.write(
                            `${COPIED}:  ${commandArr[1]} => ${destination}/${commandArr[2]}${EOL}`
                        );
                    !isHelper && stdout.write(getCurrendLocationMsg(cwd()));
                } catch (err) {
                    stdout.write(`${OPERATION_FAILED} ${err} ${EOL}`);
                    stdout.write(getCurrendLocationMsg(cwd()));
                }
            }
        });
    } else {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    }
};

const rmUtil = (command, isHelper = false) => {
    const commandArr = command.split(' ');

    if (commandArr.length !== 2) {
        stdout.write(`${INAVALID_INPUT} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } else {
        access(resolve(commandArr[1]), F_OK, (err) => {
            if (err) {
                stdout.write(`${INAVALID_INPUT} ${EOL}`);
                stdout.write(getCurrendLocationMsg(cwd()));
            } else {
                rm(resolve(commandArr[1]), (err) => {
                    if (err) {
                        stdout.write(`${OPERATION_FAILED} ${EOL}`);
                        stdout.write(getCurrendLocationMsg(cwd()));
                    }
                    !isHelper &&
                        stdout.write(`Removed file => ${commandArr[1]} ${EOL}`);
                    !isHelper && stdout.write(getCurrendLocationMsg(cwd()));
                });
            }
        });
    }
};

const mvUtil = (command) => {
    const commandArr = command.split(' ');

    try {
        cpUtil(command, true);
        rmUtil(`_ ${commandArr[1]}`, true);
    } catch (err) {
        stdout.write(`${OPERATION_FAILED} ${err} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    } finally {
        stdout.write(`${MOVED} ${EOL}`);
        stdout.write(getCurrendLocationMsg(cwd()));
    }
};

export { catUtil, addUtil, rnUtil, cpUtil, rmUtil, mvUtil };
