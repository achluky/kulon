import { connectToDatabase } from "../../../../utility/mongodb";

export default async (req, res) => {
    const { pid, nim } = req.query
    const { db } = await connectToDatabase();
    const peserta_kelas = await db
        .collection("data__kelas_mahasiswa")
        .findOne({ id_kelas : pid, nim: nim});
    if (!peserta_kelas) {
        res.status(200).json({status: false});
        return;
    }else{
        res.status(200).json({status: true});
        return;
    }
  }