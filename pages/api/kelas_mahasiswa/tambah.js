
import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        if(!req.body.kode_kelas){
            res.json(
                {
                    "error": true,
                    "message": "Masukan kode kelas"
                }
            )
        }else{
            const data = req.body;
            const kelas = await db
                        .collection("data__kelas_mahasiswa")
                        .insertOne(data);
            if (!kelas) {
                res.status(200).json({error: true, message: 'Data gagal disimpan'});
                return;
            }else{
                res.status(200).json(
                    {
                        error : false,
                        message : "Data berhasil disimpan. Selamat Anda Telah erdaftar di Kelas ini ",
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
