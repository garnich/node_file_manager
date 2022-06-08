import { createReadStream, createWriteStream, stat, rename, access, constants, copyFile, rm, unlink } from 'fs';
import { getCurrendDirMsg, getPathToFile } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import promiseHelper from '../../utils/promisHelper';
import { join } from 'path';

const catHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        return stdout.write(`Operation failed ${EOL}`);
    } else {

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
    }
};

const addHelper = (command) => {      
    const commandArr = command.split(' ');

    if(commandArr.length > 2) {
        stdout.write(`Operation failed ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {
       stat(commandArr[1], (err, stat) => {
            if(stat) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {

                const createNewFile = createWriteStream(commandArr[1]);
        
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
    const destination = getPathToFile(commandArr[1]);

    if(destination || commandArr.length !== 3) {

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
    const destination = getPathToFile(commandArr[1]);
    const fileName = commandArr[1].split('/').pop();

    if(destination || commandArr.length !== 3) {

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

const mvHelper = (command) => {
    const commandArr = command.split(' ');
    const fromPath = getPathToFile(commandArr[1]);
    const fileName = commandArr[1].split('/').pop();

    if(fromPath || commandArr.length !== 3) {

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
                        console.log('commandArr[1]', commandArr[1]);
                        console.log('join(commandArr[2], fileName)', join(commandArr[2], fileName));

                        const source = createReadStream(commandArr[1]);
                        const destination = createWriteStream(join(commandArr[2], fileName))
                    
                        source.pipe(destination);
                    
                        source.on('end', (err) => {
                            if(err) {
                                stdout.write(`Operation failed ${EOL}`)
                                stdout.write(getCurrendDirMsg(cwd()));
                            }
                    
                            unlink(commandArr[1], (err) => {
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
        return stdout.write(`Operation failed ${EOL}`);
    } else {
        access(commandArr[1], constants.F_OK, (err) => {
            if (err) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                rm(commandArr[1], (err) => {
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
