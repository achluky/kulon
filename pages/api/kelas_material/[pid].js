import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => {
    const { pid } = req.query
    const { db } = await connectToDatabase();
    const kelas_material = await db
        .collection("data__kelas_material")
        .findOne({ id_kelas_material : pid, delete: "0" });
    res.statusCode = 200
    res.json(kelas_material);
  }