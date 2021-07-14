
import { connectToDatabase } from "../../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        if(!req.body.code){
            res.json(
                {
                    "error": true,
                    "message": "Code Program Kosong"
                }
            )
        }else if(!req.body.nim_mhs){
            res.json(
                {
                    "error": true,
                    "message": "Nim Mahasiswa Kosong"
                }
            )
        }else if(!req.body.id_soal){
            res.json(
                {
                    "error": true,
                    "message": "Soal Belum ditentukan"
                }
            )
        }else if(!req.body.id_kelas_material){
            res.json(
                {
                    "error": true,
                    "message": "Kelas Material Belum ditentukan"
                }
            )
        }else{
            const data = req.body;
            const kelas = await db
                        .collection("data__solusi")
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
