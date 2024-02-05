import {
    INAVALID_INPUT,
    upRegexp,
    cdRegexp,
    lsRegexp,
    catRegexp,
    addRegexp,
    rnRegexp,
    cpRegexp,
    rmRegexp,
    mvRegexp,
} from '../constants/index.js';
import { getCurrendLocationMsg } from '../helpers/commonHelpers.js';
import { cwd, stdout } from 'process';
import { EOL } from 'node:os';
import { upUtil, cdUtil, lsUtil } from '../utils/navDirUtils.js';
import {
    addUtil,
    catUtil,
    rnUtil,
    cpUtil,
    rmUtil,
    mvUtil,
} from '../utils/fileOperationsUtil.js';

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
        case catRegexp.test(string):
            catUtil(string);
            break;
        case addRegexp.test(string):
            addUtil(string);
            break;
        case rnRegexp.test(string):
            rnUtil(string);
            break;
        case cpRegexp.test(string):
            cpUtil(string);
            break;
        case rmRegexp.test(string):
            rmUtil(string);
            break;
        case mvRegexp.test(string):
            mvUtil(string);
            break;
        default:
            stdout.write(`${INAVALID_INPUT} ${EOL}`);
            stdout.write(getCurrendLocationMsg(cwd()));
    }
};

export { readLineResolver };
