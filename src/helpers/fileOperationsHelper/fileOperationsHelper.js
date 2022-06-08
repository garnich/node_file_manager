import { createReadStream, createWriteStream, stat, rename, access, constants, copyFile } from 'fs';
import { getCurrendDirMsg, getPathToFile } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import promiseHelper from '../../utils/promisHelper';
import { join } from 'path';

const catHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        return stdout.write(`Operation failed ${EOL}`);
    }

    stat(commandArr[1], (err, stat) => {
        if(err) stdout.write(`Operation failed ${EOL}`)

        if(!stat) {
            stdout.write(`Operation failed ${EOL}`)
        } else {
            const readShort = createReadStream(commandArr[1]);
    
            readShort.on('data', (chunk) => {
                stdout.write(chunk);
            })

            readShort.on('close', (err) => {
                if(err) stdout.write(`Operation failed ${EOL}`)

                stdout.write(`${EOL}${EOL}`);
                stdout.write(getCurrendDirMsg(cwd()));
            })
        }
    })
};

const addHelper = (command) => {      
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        return stdout.write(`Operation failed ${EOL}`);
    }

    stat(commandArr[1], (err, stat) => {
        if(stat) {
            stdout.write(`Operation failed ${EOL}`)
        } else {

            const createNewFile = createWriteStream(commandArr[1]);
      
            promiseHelper(createNewFile).then(() => {
                stdout.write(`Created ${commandArr[1]}${EOL}`);
                stdout.write(getCurrendDirMsg(cwd()));
            });
            
            createNewFile.end();
        }
    })
};

const rnHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length !== 3) {
        return stdout.write(`Operation failed ${EOL}`);
    }

    const destination = getPathToFile(commandArr[1]);

    if(destination) {

        access(commandArr[1], constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                access(join(destination, commandArr[2]), constants.F_OK, (err) => {
                    if (!err) {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    } else {
                        rename(
                            commandArr[1],
                            `${destination}/${commandArr[2]}`,
                            (err) => {
                                if(err) {
                                    stdout.write(`Operation failed ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                }
                                
                                stdout.write(`Renamed:  ${commandArr[1]} => ${destination}/${commandArr[2]}${EOL}`);
                                stdout.write(getCurrendDirMsg(cwd()));
                            }
                            )
                        }
                    })
                }
            })
    } else {
        stdout.write(`Operation failed ${EOL}`)
        stdout.write(getCurrendDirMsg(cwd()));
    }
};

const cpHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length !== 3) {
        return stdout.write(`Operation failed ${EOL}`);
    }
    const destination = getPathToFile(commandArr[1]);
    const fileName = commandArr[1].split('/').pop();

    if(destination) {

        access(commandArr[1], constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(join(commandArr[2], fileName), constants.F_OK, (err) => {
                    if (!err) {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    } else {

                        copyFile(
                            commandArr[1],
                            join(commandArr[2], fileName),
                            (err) => {
                                if(err) {
                                    stdout.write(`Operation failed ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                }
                                
                                stdout.write(`Renamed:  ${commandArr[1]} => ${destination}/${commandArr[2]}${EOL}`);
                                stdout.write(getCurrendDirMsg(cwd()));
                            }
                            )
                        }
                    })
                }
            })
    } else {
        stdout.write(`Operation failed ${EOL}`)
        stdout.write(getCurrendDirMsg(cwd()));
    }
}

export { catHelper, addHelper, rnHelper, cpHelper };
