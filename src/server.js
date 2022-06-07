import * as readline from 'node:readline';
import { stdin, stdout } from 'process';
import { getUserName, getHomeDir } from './utils/utils';
import { EOL } from 'os';

const reader = () => {
    const userName = getUserName(process.argv);
    const homeDir = getHomeDir();
    const greeting = `Welcome to the File Manager, ${userName}! ${EOL}`;
    const goodBye = `Thank you for using File Manager, ${userName}!`
    
    const rl = readline.createInterface({ input: stdin, output: stdout });

    stdout.write(greeting);
    stdout.write(EOL);
    stdout.write(`${homeDir} ${EOL}`);

    rl.on('line', (input) => {
        if(input.trim() === 'exit') {
            stdout.write(goodBye);

            process.exit();
        }

        stdout.write(`Received: ${input} ${EOL}`);
    });

    rl.on('exit', () => {
        stdout.write(goodBye);
    });

    process.openStdin().on("keypress", (chunk, key) => {
        if(key && key.name === "c" && key.ctrl) {
            stdout.write(goodBye);

            process.exit();
        }
      });
}

reader();
