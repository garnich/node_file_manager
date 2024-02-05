import { homedir, EOL } from 'node:os';
import { STRANGER } from '../constants/index.js';

const getUserName = (args) => {
    const userName = args.slice(2).reduce((acc, key) => {
        if (/^--username/.test(key)) {
            const values = key.split('=');

            acc['data'] = values[1];
        }

        return acc;
    }, {});

    return userName.data || STRANGER;
};

const getHomeDir = () => {
    return homedir();
};

const getCurrendLocationMsg = (dir) => {
    return `You are currently in => ${dir} ${EOL}`;
};

const getPathToFile = (str) => {
    const pathArr = str.split('/');
    if (pathArr.length > 1) {
        pathArr.length = pathArr.length - 1;
        return pathArr.join('/');
    }

    return null;
};

export { getUserName, getHomeDir, getCurrendLocationMsg, getPathToFile };
