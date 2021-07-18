import { connectToDatabase } from "../../../utility/mongodb";
export default async (req, res) => {
    const { pid } = req.query
    const { db } = await connectToDatabase();

    const jml_kelas = await db
        .collection("data__kelas")
        .find({ nim_nidn : pid })
        .count();
    
    const jml_soal = await db
        .collection("data__soal")
        .find({ nim_nidn : pid })
        .count();

        res.statusCode = 200
        res.json({error: false, data: {
            jml_kelas:jml_kelas,
            jml_soal:jml_soal
        }})
};