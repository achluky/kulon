import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => {
    const { pid } = req.query
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__pengumuman")
        .findOne({ id_pengumuman : pid});
    res.statusCode = 200
    res.json(kelas);

  }