import { INAVALID_INPUT } from '../constants';
import { getCurrendLocationMsg } from '../helpers/commonHelpers';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';

const readLineResolver = (string) => {
    switch(true) {
        default:
            stdout.write(`${INAVALID_INPUT} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
    }
};

export { readLineResolver };
