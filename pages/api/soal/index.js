import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__soal")
        .find({delete: "0"})
        .sort({ metacritic: -1 })
        .toArray();
    res.statusCode = 200
    res.json(kelas);
};


