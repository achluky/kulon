import { connectToDatabase } from "../../utility/mongodb";
export default async (req, res) => {   
    const { db } = await connectToDatabase();
    const data = await db
        .collection("data__user")
        .find({tipe: "dosen"})
        .toArray();
    if (!data) {
        res.status(404).json({error: true, message: 'Tidak Terdapat Data Dosen Pengejar'});
        return;
    }else{
        res.statusCode = 200
        res.json(data)
    }
};