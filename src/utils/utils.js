import { homedir } from 'os';

const getUserName = (args) => {
    const userName = args.slice(2).reduce(
        (acc, key) => {
            if(/^--username/.test(key)) {
                const values = key.split('=');

                acc['data'] = values[1] 
            }
            
        return acc
    }, {});

    return userName.data;
}

const getHomeDir = () => {
    return homedir();
}

export { getUserName, getHomeDir };
