import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => 
{
    const { pid, nim } = req.query
    const { db } = await connectToDatabase();
    const peserta_kelas = await db
        .collection("data__kelas_mahasiswa")
        .find({ id_kelas : pid})
        .toArray();
    res.status(200).json(peserta_kelas);
    return;
  }