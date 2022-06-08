import { createReadStream, stat } from 'fs';
import { getCurrendDirMsg } from '../../utils/commonUtils';
import { cwd, stdout } from 'process';
import { EOL } from 'os';

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

export { catHelper };
