
import { connectToDatabase } from "../../utility/mongodb";
export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') 
    {
        console.log(req.body);
        if(!req.body.code){
            res.json(
                {
                    "error": true,
                    "message": "Code program kosong"
                }
            )
        }else{
            const data = req.body;
            await sleep(1000);
            res.json(
                {
                    "status": "Done..."
                }
            )
        }
    } else {
        res.statusCode = 401;
        res.json(
            {
                "error": true,
                "message": "Method must be POST"
            }
        )
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}