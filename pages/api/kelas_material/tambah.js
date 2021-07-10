
import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        if(!req.body.minggu_ke){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Minggu Ke"
                }
            )
        }else if(!req.body.keyword_soal){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Keyword Soal Yang Anda Buat"
                }
            )
        }else if(!req.body.materi){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Materi Minggu ini"
                }
            )
        }else{
            const data = req.body;
            const kelas = await db
                        .collection("data__kelas_material")
                        .insertOne(data);
            if (!kelas) {
                res.status(200).json({error: true, message: 'Data gagal disimpan'});
                return;
            }else{
                res.status(200).json(
                    {
                        error : false,
                        message : "Data berhasil disimpan",
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
                "message": "Method must be POST"
            }
        )
    }
};
