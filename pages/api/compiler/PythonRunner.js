import { spawn } from 'child_process';
import Runner from './Runner';
 
class PythonRunner extends Runner {
    defaultFile() {
        return this.defaultfile;
    }

    defaultExtensionFile() {
        return this.defaultExtensionFile;
    }
    
    constructor() {
        super();
        this.defaultfile = 'Hello.py';
        this.defaultExtensionFile = '.py';
    }
    
    run(file, directory, filename, extension, callback) {
        if (extension.toLowerCase() !== '.py') {
            console.log(`${file} is not a python file.`);
        }
        this.execute(file, directory, callback);
    }
    
    execute(file, directory, callback) {
        // set working directory for child_process
        const options = { cwd: directory };
        const argsRun = [];
        argsRun[0] = file;

        console.log(`options: ${options}`);
        console.log(`argsRun: ${argsRun}`);

        const executor = spawn('python', argsRun, options);
        executor.stdout.on('data', (output) => {
            console.log(String(output));
            callback('0', String(output)); // 0, no error
        });
        executor.stderr.on('data', (output) => {
            console.log(`stderr: ${String(output)}`);
            callback('2', String(output)); // 2, execution failure
        });
        executor.on('close', (output) => {
            this.log(`stdout: ${output}`);
        });
    }
    
    log(message) {
        console.log(message);
    }
}
 
export default PythonRunner;