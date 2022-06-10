import { EOL } from 'os';
import { createHash } from 'crypto';
import { createReadStream, stat } from 'fs';
import { cwd, stdout } from 'process';
import { getCurrendDirMsg } from '../../utils/commonUtils';

const hashHelper = (command) => {
    const commandArr = command.split(' ');

    if(commandArr.length !== 2) {
        stdout.write(`Operation failed ${EOL}`);
        stdout.write(getCurrendDirMsg(cwd()));
    } else {
       stat(commandArr[1], (err, stat) => {
            if(!stat) {
                stdout.write(`Operation failed ${EOL}`)
                stdout.write(getCurrendDirMsg(cwd()));
            } else {
                const source = createReadStream(commandArr[1]); 
                const hash = createHash('sha256');
                
                source.on('data', (chunk) => {
                    hash.update(Buffer.from(chunk).toString());
                    const hex = hash.digest('hex');

                    stdout.write(`${EOL}${EOL}`);
                    stdout.write(`${commandArr[1]} hash => ${hex}`);
                })

                source.on('close', (err) => {
                    if(err) stdout.write(`Operation failed ${EOL}`)

                    stdout.write(`${EOL}${EOL}`);
                    stdout.write(getCurrendDirMsg(cwd()));
                })
            }
        }) 
    }
};

export { hashHelper };
