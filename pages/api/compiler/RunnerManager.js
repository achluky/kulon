// import { join, parse, path } from 'path';
import { saveFileCode } from './SaveFile';
import CRunner from './CRunner';
import CppRunner from './CppRunner';
import PythonRunner from './PythonRunner';
const path = require('path');

class Factory {
    constructor() {
        this.createRunner = function createRunner(lang) 
        {
            let runner;
            if (lang === 'c') {
                runner = new CRunner();
            } else if (lang === 'cpp') {
                runner = new CppRunner();
            } else if (lang === 'python') {
                runner = new PythonRunner();
            }
            return runner;
        };
    }
}
 
export function run(lang, code, nm_file, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());
    
    const directory = path.join(process.env.DIR_CODE, lang);
    const file = path.join(directory, nm_file+runner.defaultExtensionFile);

    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java

    saveFileCode.saveCode(file, code, () => {
        runner.run(file, directory, filename, extension, (status, message) => {
            const result = {
                status,
                message,
            };
            res.end(JSON.stringify(result));
        });
    });
}