import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'PUT') 
    {   
        if(!req.body.id_pengumuman){
            res.json(
                {
                    "error": true,
                    "message": "Masukan Id"
                }
            )
        }else{
            const data = req.body;
            const query = { id_pengumuman: data.id_pengumuman };
            const value = { $set: {
                                delete:  "1"
                            }
                        };
            const kelas = await db
                        .collection("data__pengumuman")
                        .updateOne(query, value);
            if (!kelas) {
                res.status(200).json({error: true, message: 'Data gagal Dihapus'});
                return;
            }else{
                res.status(200).json(
                    {
                        error : false,
                        message : "Data berhasil Dihapus",
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
