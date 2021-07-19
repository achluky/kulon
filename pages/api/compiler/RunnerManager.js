import { saveFileCode } from './SaveFile';
import CRunner from './CRunner';
import CppRunner from './CppRunner';
import PythonRunner from './PythonRunner';
import appRoot from 'app-root-path';
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
    
    const DIR_CODE = path.resolve(
        `${appRoot}`,
        "temp"
    );

    const directory = path.join(DIR_CODE, lang);
    // const file = path.join(directory, nm_file+runner.defaultExtensionFile);

    const file = path.resolve(directory, runner.sourceFile()); // soluis
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .py

    saveFileCode.saveCode(file, code, () => {

        const testFile = path.resolve(directory, runner.testFile());
        const testFileName = path.parse(testFile).name; // main

        runner.run(testFile, directory, testFileName, extension, function(
            status,
            message
        ) {
            if (status == "ok") {
                const result = {
                    status,
                    message
                };

                if (message.startsWith("[Success]")) {
                        result ['testcase'] = 'success';
                } else {
                    result ['testcase'] = 'fail';
                }
                res.end(JSON.stringify(result));
            } else {
                const result = {
                    status,
                    message,
                    testcase: null
                };
                res.end(JSON.stringify(result));
            }
        });
    });
}