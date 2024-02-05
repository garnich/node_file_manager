import * as readline from 'node:readline';
import { EOL } from 'node:os';
import { stdin, stdout, cwd, chdir } from 'process';
import {
    getUserName,
    getHomeDir,
    getCurrendLocationMsg,
} from './src/helpers/commonHelpers.js';
import { readLineResolver } from './src/resolver/index.js';

const fm = () => {
    const userName = getUserName(process.argv);
    const startMsg = `Welcome to the File Manager, ${userName}! ${EOL}`;
    const endMsg = `${EOL}Thank you for using File Manager, ${userName}, goodbye!`;

    const readLine = readline.createInterface({ input: stdin, output: stdout });

    stdout.write(startMsg);
    stdout.write(EOL);

    chdir(getHomeDir());

    stdout.write(getCurrendLocationMsg(cwd()));

    readLine.on('line', (input) => {
        if (input.trim() === '.exit') {
            stdout.write(endMsg);

            process.exit();
        }

        stdout.write(EOL);

        readLineResolver(input);
    });

    readLine.on('SIGINT', () => {
        stdout.write(endMsg);
        process.exit();
    });
};

fm();
