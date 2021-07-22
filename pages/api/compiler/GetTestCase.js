
import { connectToDatabase } from "../../../utility/mongodb";

export const saveFileCode = {
    findTestCase
};

function findTestCase(id_soal, callback) {
    const { db } =  connectToDatabase();
    const data =  db
        .collection("data__soal")
        .findOne({'id_soal': id_soal});
    if (!data) {
        callback ('88', 'Data soal tidak ada');
    }else{
        callback (0, data);
    }
}
