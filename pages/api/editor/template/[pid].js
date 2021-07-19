// /api/editor/file/:lang
import fs  from 'fs'
import path from 'path'

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async (req, res) => {
    try {
        const { pid } = req.query // lang
        let file = '';
        const language = pid.toLowerCase();
        if (language === 'java') {
            file = path.join(__dirname, '../../../../../../templates', 'Hello.java');
        } else if (language === 'c') {
            file = path.join(__dirname, '../../../../../../templates', 'Hello.c');
        } else if (language === 'cpp') {
            file = path.join(__dirname, '../../../../../../templates', 'Hello.cpp');
        } else if (language === 'javascript') {
            file = path.join(__dirname, '../../../../../../templates', 'Hello.js');
        } else if (language === 'python') {
            file = path.join(__dirname, '../../../../../../templates', 'Hello.py');
        } else {
            callback('');
            return;
        }
        fs.readFile(file, (err, data) => {
            if (err) {
                throw err;
            }else{
                res.status(200).json({lang: language, code: data.toString()});
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error)
    }
}
