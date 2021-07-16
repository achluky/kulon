const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
import fs  from 'fs'

export const saveFileCode = {
    saveCode
};

function saveCode(file, code, callback) {
    mkdirp(getDirName(file), (err) => {
        if (err) {
            return callback(err);
        }
        return fs.writeFile(file, code, (err2) => {
            if (err2) {
                throw err2;
            }
            callback();
        });
    });
}