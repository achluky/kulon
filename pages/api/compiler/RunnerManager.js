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
 
export function run(lang, code, nim_id_soal, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());
    
    const DIR_CODE = path.resolve( // direktori semua code
        `${appRoot}`,
        "temp"
    );

    const DIR_SOURCE = path.resolve( // buat source file (solusi, solusitester & info) sebagai template
        `${appRoot}`,
        "temp",
        lang,
        "source"
    );

    const arr_indentias = nim_id_soal.split("_");
    const nim=arr_indentias[0];
    const id_soal=arr_indentias[1];

    const directory = path.join(DIR_CODE, lang, id_soal, nim); // sesuai dengan bahasa pemrograman, id soal dan nim
    const file = path.resolve(directory, runner.sourceFile()); // soluis
    const extension = path.parse(file).ext; // .py

    // jika belum ada
    // pindahkan file solusi ke direktori (sesuai dengan no soal dan mhs)
    // selainnya
    // hanya lakukan save code dari editor
    saveFileCode.copyDirectory(DIR_SOURCE, directory, id_soal, nim, err =>{
        if (err) {
            res.end(JSON.stringify({ status:99, message: err, testcase: null }));
        }
        // save code di file solusi
        saveFileCode.saveCode(file, code,  () => {
            // Aternatif 1
            const testFile = path.resolve(directory, runner.testFile()); // file for call solusion file
            const testFileName = path.parse(testFile).name; // main

            // Alternatif 2
            const codeFile = file
            const codeFileName = path.parse(file).name;
            
            // Alternatif 1
            runner.run(testFile, directory, testFileName, extension, function(            
            
            // Alternatif 2
            // runner.run(codeFile, directory, codeFileName, extension, id_soal, nim, function(
                status,
                message
            ) {
                if (status == "0") 
                {
                    const result = {
                        status,
                        message
                    };
                    if (message.startsWith("Success")) {
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

    });

}