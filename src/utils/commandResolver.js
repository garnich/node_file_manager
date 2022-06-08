import { lsHelper, upHelper, cdHelper } from '../helpers/navDirHelper/navDirHelper';
import { catHelper } from '../helpers/fileOperationsHelper/fileOperationsHelper';
import { cdRegexp, upRegexp, lsRegexp, catRegexp } from '../constants';

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
        default:
            return console.log('Invalid input');
    }
}

export default commandResolver;
