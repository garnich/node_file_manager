import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { getUserName } from './utils/utils';

const reader = async () => {
    const userName = getUserName(process.argv);
    const greeting = `Welcome to the File Manager, ${userName}!`;
    const goodBye = `Thank you for using File Manager, ${userName}!`
    
    console.log(greeting); //TODO: replace

    const rl = readline.createInterface({ input, output });

    rl.on('line', (input) => {
        console.log(`Received: ${input}`);

    });

    rl.on('exit', () => {
        console.log(`Thank you for using File Manager, ${userName}!`);
    });

    process.openStdin().on("keypress", (chunk, key) => {
        if(key && key.name === "c" && key.ctrl) {
            console.log(goodBye); //TODO: replace
          process.exit();
        }
      });
}

reader();