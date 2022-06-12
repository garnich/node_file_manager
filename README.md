# NODE20222Q2 file-manager task

## Commands:
- start FM => `npm run start -- --username=your_username`
- exit FM => `ctrl + c` or `.exit`

### Navigation & working directory
- Go upper from current directory => `up`
- Go to dedicated folder from current directory => `cd path_to_directory`
- List all files and folder in current directory => `ls`

### Basic operations with file
- Read file and print it's content in console => `cat path_to_file`
- Create empty file in current working directory => `add new_file_name`
- Rename file => `rn path_to_file new_filename`
- Copy file => `cp path_to_file path_to_new_directory`
- Move file (same as copy but initial file is deleted) => `mv path_to_file path_to_new_directory`
- Delete file => `rm path_to_file`

### Operating system info (prints following information in console)
- Get EOL (default system End-Of-Line) => `os --EOL`
- Get host machine CPUs info => `os --cpus`
- Get home directory => `os --homedir`
- Get current system user name => `os --username`
- Get CPU architecture => `os --architecture`

### Hash calculation
- Calculate hash for file => `hash path_to_file`

### Compress and decompress operations (using Brotli algorithm)
- Compress file => `compress path_to_file path_to_destination`
- Decompress file => `decompress path_to_file path_to_destinations`
