import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__modul")
        .find()
        .sort({ metacritic: -1 })
        .toArray();
    res.statusCode = 200
    res.json(kelas);
};


