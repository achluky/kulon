const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
import fs  from 'fs'

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function (req, res)
{   
    const { language, pid } = req.query // file_name
    try {
        mkdirp(getDirName('./code/'+language+'/'+pid), (err) => {
            if (err) 
                return callback(err);
            return fs.writeFile('./code/'+language+'/'+pid, "hello python", (err2) => {
              if (err2) {
                throw err2;
              }
                const data = {
                    lang: language,
                    status: true,
                    file: pid
                };
                res.send(JSON.stringify(data));
            });
        });
    } catch (error) {
        res.status(500).send(error)
    }
}
