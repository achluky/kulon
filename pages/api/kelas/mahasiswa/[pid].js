import { connectToDatabase } from "../../../../utility/mongodb";

export default async (req, res) => {
    const { pid } = req.query
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__kelas_mahasiswa")
        .find({ nim : pid})
        .toArray();
    res.statusCode = 200
    res.json(kelas);

  }