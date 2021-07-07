
import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        if(!req.body.nama_soal){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Judul/Nama Soal"
                }
            )
        }else if(!req.body.semester){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Semester Kelas Dilakukan"
                }
            )
        }else if(!req.body.prodi){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Program Studi"
                }
            )
        }else if(!req.body.deskripsi_soal){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Deskripsi Soal"
                }
            )
        }else{
            const data = req.body;
            const kelas = await db
                        .collection("data__soal")
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
