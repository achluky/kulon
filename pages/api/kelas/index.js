import { connectToDatabase } from "../../../utility/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const kelas = await db
        .collection("data__kelas")
        .find({delete: "0"})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    res.statusCode = 200
    res.json(kelas);
};


