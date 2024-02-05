const STRANGER = 'Stranger';

const INAVALID_INPUT = 'Invalid input';

const OPERATION_FAILED = 'Operation failed';

const FILE_EXIST = 'File exist';

const RENAMED = 'Renamed';

const COPIED = 'Copied';

const MOVED = 'File MOVED';

const OS_VALUES = {
    EOL: 'EOL',
    CPUS: 'CPUS',
    HOMEDIR: 'HOMEDIR',
    USERNAME: 'USERNAME',
    ARCHITECTURE: 'ARCHITECTURE',
};

const upRegexp = /up/;
const cdRegexp = /^cd\s{1}/;
const lsRegexp = /ls/;

const catRegexp = /^cat\s{1}/;
const addRegexp = /^add\s{1}/;
const rnRegexp = /^rn\s{1}/;
const cpRegexp = /^cp\s{1}/;
const rmRegexp = /^rm\s{1}/;
const mvRegexp = /^mv\s{1}/;

const osRegexp = /^os\s{1}/;

const hashRegexp = /^hash\s{1}/;

const compressRegexp = /^compress\s{1}/;
const decompressRegexp = /^decompress\s{1}/;

export {
    STRANGER,
    INAVALID_INPUT,
    OPERATION_FAILED,
    FILE_EXIST,
    RENAMED,
    COPIED,
    MOVED,
    OS_VALUES,
    upRegexp,
    cdRegexp,
    lsRegexp,
    catRegexp,
    addRegexp,
    rnRegexp,
    cpRegexp,
    rmRegexp,
    mvRegexp,
    osRegexp,
    hashRegexp,
    compressRegexp,
    decompressRegexp
};
