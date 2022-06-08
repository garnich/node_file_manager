import { lsHelper, upHelper, cdHelper } from '../helpers/navDirHelper/navDirHelper';
import { cdRegexp, upRegexp, lsRegexp } from '../constants';

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
        default:
            return console.log('Invalid input');
    }
}

export default commandResolver;
