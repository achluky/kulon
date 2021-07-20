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
        console.log(`optionsx: ${options}`);
        console.log(`argsRun: ${argsRun}`);
        const executor = spawn('python3', argsRun, options);
        executor.stdout.on('data', (output) => {
            // console.log(String(output));
            
            const out = String(output);
            // console.log(output);
            console.log(`pythonRunner->execute(): stdout:`);
            // if (out.startsWith("[Success]") || out.startsWith("[Fail]")) 
                callback('0', String(output)); // 0, no error
            
            //     callback('0', String(output)); // 0, no error
                // callback("ok", String(output)); // ok, no error
        });
        executor.stderr.on('data', (output) => {
            // console.log(`stderr: ${String(output)}`);
            // callback('2', String(output)); // 2, execution failure
            console.log(`stderr: ${String(output)}`);
            callback("2", String(output)); // err, execution failure
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