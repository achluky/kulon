import { spawn } from 'child_process';
import Runner from './Runner';
class PythonRunner extends Runner {
    defaultFile() {
        return this.defaultfile;
    }
    defaultExtensionFile() {
        return this.defaultExtensionFile;
    }
    sourceFile() {
        return this.sourcefile;
    }
    testFile() {
        return this.testfile;
    }
    constructor() {
        super();
        this.defaultfile = 'Hello.py';
        this.defaultExtensionFile = '.py';
        this.sourcefile = "Solution.py";
        this.testfile = "SolutionTester.py";
    }
    run(file, directory, filename, extension, callback) {
        if (extension.toLowerCase() !== '.py') {
            console.log(`${file} is not a python file.`);
        }
        this.execute(file, directory, callback);
    }
    execute(file, directory, callback) {
        const options = { cwd: directory };
        const argsRun = [];
        argsRun[0] = file;

        console.log(`options: ${options}`);
        console.log(`argsRun: ${argsRun}`);
        
        const executor = spawn('python3', argsRun, options);
        var dataToSend = '';
        executor.stdout.on('data', (output) => {
            console.log(`${String(output)}`);
            dataToSend += output.toString();
        });
        executor.stderr.on('data', (output) => {
            console.log(`stderr: ${String(output)}`);
            dataToSend += output.toString();
        });
        executor.on('close', (code) => {
            this.log(`stdout: ${code}`);
            callback(code, dataToSend);
        });
    }
    log(message) {
        console.log(message);
    }
}
 
export default PythonRunner;