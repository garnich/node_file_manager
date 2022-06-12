import { createReadStream, createWriteStream, stat, rename, access, constants, copyFile, rm, unlink } from 'fs';
import { getCurrendDirMsg, getPathToFile } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import promiseHelper from '../../utils/promisHelper';
import { join, resolve } from 'path';

const catHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {

        stat(resolve(commandArr[1]), (err, stat) => {

            if(!stat || err) {
                stdout.write(`Invalid input ${EOL}`);
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                const readShort = createReadStream(resolve(commandArr[1]));
        
                readShort.on('data', (chunk) => {
                    stdout.write(chunk);
                })

                readShort.on('close', (err) => {
                    if(err) {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    }

                    stdout.write(`${EOL}${EOL}`);
                    stdout.write(getCurrendDirMsg(cwd()));
                })
            }
        })
    }
};

const addHelper = (command) => {      
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {
       stat(resolve(commandArr[1]), (err, stat) => {
            if(stat) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                const createNewFile = createWriteStream(resolve(commandArr[1]));
        
                promiseHelper(createNewFile).then(() => {
                    stdout.write(`Created ${commandArr[1]}${EOL}`);
                    stdout.write(getCurrendDirMsg(cwd()));
                });
                
                createNewFile.end();
            }
        }) 
    }
};

const rnHelper = (command) => {
    const commandArr = command.split(' ');
    const destination = getPathToFile(resolve(commandArr[1]));

    if(destination || commandArr.length !== 3) {

        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                access(resolve(destination, commandArr[2]), constants.F_OK, (err) => {
                    if (!err) {
                        stdout.write(`Invalid input ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    } else {
                        rename(
                            resolve(commandArr[1]),
                            join(destination, commandArr[2]),
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
    const destination = getPathToFile(resolve(commandArr[1]));
    const fileName = commandArr[1].split('/').pop();

    if(destination || commandArr.length !== 3) {

        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(resolve(commandArr[2], fileName), constants.F_OK, (err) => {
                    if (!err) {
                        stdout.write(`Invalid input ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    } else {

                        copyFile(
                            resolve(commandArr[1]),
                            resolve(commandArr[2], fileName),
                            (err) => {
                                if(err) {
                                    stdout.write(`Operation failed ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                }
                                
                                stdout.write(`Copied:  ${commandArr[1]} => ${destination}/${commandArr[2]}${EOL}`);
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

const mvHelper = (command) => {
    const commandArr = command.split(' ');
    const fromPath = getPathToFile(resolve(commandArr[1]));
    const fileName = commandArr[1].split('/').pop();

    if(fromPath || commandArr.length !== 3) {

        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                access(resolve(commandArr[2], fileName), constants.F_OK, (err) => {
                    if (!err) {
                        stdout.write(`Invalid input ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    } else {

                        const source = createReadStream(resolve(commandArr[1]));
                        const destination = createWriteStream(resolve(commandArr[2], fileName))
                    
                        source.pipe(destination);
                    
                        source.on('end', (err) => {
                            if(err) {
                                stdout.write(`Operation failed ${EOL}`)
                                stdout.write(getCurrendDirMsg(cwd()));
                            }
                    
                            unlink(resolve(commandArr[1]), (err) => {
                                if(err) {
                                    stdout.write(`Operation failed ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd())); 
                                } else {
                                    stdout.write(`File MOVED ${EOL}`)
                                    stdout.write(getCurrendDirMsg(cwd()));
                                }
                            })
                        })
                        }
                    })
                }
            })
    } else {
        stdout.write(`Operation failed ${EOL}`)
        stdout.write(getCurrendDirMsg(cwd()));
    }
};

const rmHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length !== 2) {
        stdout.write(`Invalid input ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {
        access(resolve(commandArr[1]), constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Invalid input ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                rm(resolve(commandArr[1]), (err) => {
                    if(err) {
                        stdout.write(`Operation failed ${EOL}`)
                        stdout.write(getCurrendDirMsg(cwd()));
                    }
                    stdout.write(`Removed file => ${commandArr[1]} ${EOL}`)
                    stdout.write(getCurrendDirMsg(cwd()));
                })
            }
        })
    }
};

export { catHelper, addHelper, rnHelper, cpHelper, mvHelper, rmHelper };
