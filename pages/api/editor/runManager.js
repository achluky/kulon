import { run } from "../compiler/RunnerManager";
import { connectToDatabase } from "../../../utility/mongodb";

export const config = {
    api: {
        externalResolver: true,
    },
}

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
        }else if(!req.body.lang){
            res.json(
                {
                    "error": true,
                    "message": "Pilih bahasa pemrograman"
                }
            )
        }else if(!req.body.nim_id_soal){
            res.json(
                {
                    "error": true,
                    "message": "Nim dan soal kosong"
                }
            )
        }else{
            const file = req.body; // lang & code & nim_id_soal
            run(file.lang, file.code, file.nim_id_soal, res);
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