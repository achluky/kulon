import { connectToDatabase } from "../../../../utility/mongodb";

export default async (req, res) => {
    const { pid, id_soal } = req.query
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__soal")
        .findOne({ id_kelas_material : pid, id_soal: id_soal});
    res.statusCode = 200
    res.json(kelas);
  }