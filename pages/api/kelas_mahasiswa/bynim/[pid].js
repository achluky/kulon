import { connectToDatabase } from "../../../../utility/mongodb";

export default async (req, res) => 
{
    const { pid } = req.query
    console.log(pid);
    const { db } = await connectToDatabase();
    const peserta_kelas = await db
        .collection("data__kelas_mahasiswa")
        .findOne({ nim : pid, status:"1"});
    res.status(200).json(peserta_kelas);
    return;
  }