

import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'PUT') 
    {   
        if(!req.body.id_soal){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Id Soal"
                }
            )
        }else{
            const data = req.body;
            const query = { id_soal: data.id_soal };
            const value = { $set: data };
            
            const kelas = await db
                        .collection("data__soal")
                        .updateOne(query, value);
            if (!kelas) {
                res.status(200).json({error: true, message: 'Data gagal diperbaharui'});
                return;
            }else{
                res.status(200).json(
                    {
                        error : false,
                        message : "Data berhasil diperbaharui",
                        data: data
                    }
                );
                return;
            }
        }
    } else {
        res.statusCode = 401;
        res.json(
            {
                "error": true,
                "message": "Method must be PUT"
            }
        )
    }
};
