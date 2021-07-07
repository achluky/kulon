

import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'PUT') 
    {   
        if(!req.body.nama_soal){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Nama Modul"
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
            const query = { id_soal: data.id_soal };
            const value = { $set: {
                                    nama_soal: data.nama_soal, 
                                    deskripsi_soal: data.deskripsi_soal,
                                    semester: data.semester, 
                                    nama_semester: data.nama_semester, 
                                    prodi: data.prodi , 
                                    nama_prodi:  data.nama_prodi, 
                                    updateAt: data.updateAt} 
                        };
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
