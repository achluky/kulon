
import { connectToDatabase } from "../../../utility/mongodb";
import {PythonShell} from 'python-shell';

export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        if(!req.body.code){
            res.json(
                {
                    "error": true,
                    "message": "Code program kosong"
                }
            )
        }else{
            const data = req.body;
            let options = {
                mode: 'text',
                pythonPath: '/usr/bin/python',
                pythonOptions: ['-u'],
                args: ['Bruce Wayne', 'ahmad luky']
            };

            PythonShell.runString(data.code, options, function (err, results) {
                if (err) throw err;
                console.log(results);
            });
            res.json(
                {
                    "status": "Done..."
                }
            )
        }
    } else {
        res.statusCode = 401;
        res.json(
            {
                "error": true,
                "message": "Method must be POST"
            }
        )
    }
};