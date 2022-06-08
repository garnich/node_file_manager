import { lsHelper, upHelper, cdHelper } from '../helpers/navDirHelper/navDirHelper';
import { catHelper, addHelper, rnHelper, cpHelper, mvHelper, rmHelper } from '../helpers/fileOperationsHelper/fileOperationsHelper';
import { cdRegexp, upRegexp, lsRegexp, catRegexp, addRegexp, rnRegexp, cpRegexp, mvRegexp, rmRegexp } from '../constants';

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
        default:
            return console.log('Invalid input');
    }
}

export default commandResolver;
