const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
import fs  from 'fs'
const ncp = require("ncp").ncp;

export const saveFileCode = {
    saveCode,
    copyDirectory
};

function saveCode(file, code, callback) {
    return fs.writeFile(file, code, (err2) => {
        if (err2) {
            throw err2;
        }
        callback();
    });
}


function copyDirectory(source, target, id_soal, nim, callback) {
  if (!fs.existsSync(target)){
    fs.mkdir(target, 
      { recursive: true }, 
      err => {
        if (err) 
          return callback(err);
        ncp(source, target, function(err) {
          if (err) {
            return callback(err);
          }
        
          fs.writeFile(target+'/info.txt', process.env.MONGODB_URI+'\n'+id_soal+'\n'+nim, (err2) => {
              if (err2) {
                  throw err2;
              }
              callback();
          });
          
          callback();
        });
    });
  }else{
    callback();
  }
};