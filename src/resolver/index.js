import { INAVALID_INPUT, upRegexp, cdRegexp, lsRegexp } from '../constants';
import { getCurrendLocationMsg } from '../helpers/commonHelpers';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';
import { upUtil, cdUtil, lsUtil } from '../utils/navDirUtils';

const readLineResolver = (string) => {
    switch (true) {
        case upRegexp.test(string):
            upUtil();
            break;
        case cdRegexp.test(string):
            cdUtil(string);
            break;
        case lsRegexp.test(string):
            lsUtil();
            break;
        default:
            stdout.write(`${INAVALID_INPUT} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
    }
};

export { readLineResolver };
