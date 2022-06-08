import * as readline from 'node:readline';
import { stdin, stdout, cwd, chdir } from 'process';
import { getUserName, getCurrendDirMsg, getHomeDir } from './utils/commonUtils';
import commandResolver from './utils/commandResolver';
import { EOL } from 'os';


const reader = () => {
    const userName = getUserName(process.argv);
    const greeting = `Welcome to the File Manager, ${userName}! ${EOL}`;
    const goodBye = `${EOL}Thank you for using File Manager, ${userName}!`;

    
    const rl = readline.createInterface({ input: stdin, output: stdout });

    stdout.write(greeting);
    stdout.write(EOL);
    chdir(getHomeDir());

    stdout.write(getCurrendDirMsg(cwd()));

    rl.on('line', (input) => {
        if(input.trim() === '.exit') {
            stdout.write(goodBye);

            process.exit();
        }

        stdout.write(EOL);
        commandResolver(input)
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
