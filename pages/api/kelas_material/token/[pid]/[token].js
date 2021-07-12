import { connectToDatabase } from "../../../../../utility/mongodb";

export default async (req, res) => {
    const { pid, token } = req.query
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__kelas_material")
        .find({ id_kelas_material : pid, token: token })
        .count();
    res.statusCode = 200;
    if(kelas>0){
        res.json({"status": true});
    }else{
        res.json({"status": false, "statusText": "Token Salah. Tanyakan Pada Dosen Pengajar"});
    }
  }