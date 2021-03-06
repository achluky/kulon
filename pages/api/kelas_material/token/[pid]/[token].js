import { connectToDatabase } from "../../../../../utility/mongodb";

export default async (req, res) => {
    const { pid, token } = req.query
    const { db } = await connectToDatabase();
    const kelas_material = await db
        .collection("data__kelas_material")
        .find({ id_kelas_material : pid, token: token })
        .count();
    const soal = await db
        .collection("data__soal")
        .findOne({ id_kelas_material : pid, delete : "0"});
    res.statusCode = 200;
    if(kelas_material>0){
        res.json({"status": true, "id_soal": soal.id_soal});
    }else{
        res.json({"status": false, "statusText": "Token Salah. Tanyakan Pada Dosen Pengajar"});
    }
  }