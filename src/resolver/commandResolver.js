import { lsHelper, upHelper, cdHelper } from '../helpers/navDirHelper/navDirHelper';
import { catHelper, addHelper, rnHelper, cpHelper, mvHelper, rmHelper } from '../helpers/fileOperationsHelper/fileOperationsHelper';
import { osHelper } from '../helpers/osHelper/osHelper';
import { cdRegexp, upRegexp, lsRegexp, catRegexp, addRegexp, rnRegexp, cpRegexp, mvRegexp, rmRegexp, osRegexp, hashRegexp, compressRegexp, decompressRegexp } from '../constants';
import { hashHelper } from '../helpers/hashHelper/hashHelper';
import { compressHelper, decompressHelper } from '../helpers/compressDecompressHelper/compressDecompressHelper';
import { cwd, stdout } from 'process';
import { EOL } from 'os';
import { getCurrendDirMsg } from '../utils/commonUtils';

const commandResolver = (command) => {
    switch(true) {
        case upRegexp.test(command):
            upHelper();
            break;
        case cdRegexp.test(command):
            cdHelper(command);
            break;
        case lsRegexp.test(command):
            lsHelper();
            break;
        case catRegexp.test(command):
            catHelper(command);
            break;
        case addRegexp.test(command):
            addHelper(command);
            break;
        case rnRegexp.test(command):
            rnHelper(command);
            break;
        case cpRegexp.test(command):
            cpHelper(command);
            break;
        case rmRegexp.test(command):
            rmHelper(command);
            break;
        case mvRegexp.test(command):
            mvHelper(command);
            break;
        case osRegexp.test(command):
            osHelper(command);
            break;
        case hashRegexp.test(command):
            hashHelper(command);
            break;
        case compressRegexp.test(command):
            compressHelper(command);
            break;
        case decompressRegexp.test(command):
            decompressHelper(command);
            break;
        default:
            stdout.write(`Invalid input ${EOL}`);
            stdout.write(getCurrendDirMsg(cwd()));
    }
}

export default commandResolver;
