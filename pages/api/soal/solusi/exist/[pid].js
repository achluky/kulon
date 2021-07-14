import { connectToDatabase } from "../../../../../utility/mongodb";

export default async (req, res) => {
    const { pid } = req.query
    const { db } = await connectToDatabase();
    const solusi_count = await db
        .collection("data__solusi")
        .find({ id_soal : pid})
        .count();
    const solusi = await db
        .collection("data__solusi")
        .findOne({ id_soal : pid});
    
    res.statusCode = 200
    if(solusi_count){
        res.json({
            "exist": solusi_count,
            "solusi": solusi
        });
    }else{
        res.json({
            "exist": 0,
            "solusi": "Belum dikerjakan"
        });
    }
  }