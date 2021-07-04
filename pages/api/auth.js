import { connectToDatabase } from "../../utility/mongodb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (req.method === 'POST') 
    {
        if(!req.body.nim){
            res.json(
                {
                    "error": true,
                    "message": "Masukan NIM/NIP"
                }
            )
        }else if(!req.body.password){
            res.json(
                {
                    "error": true,
                    "message": "Masukan password"
                }
            )
        }else{
            const { nim, password } = req.body;
            const user = await db
                        .collection("data__user")
                        .findOne({nim_nidn: nim});
            if (!user) {
                res.status(200).json({error: true, message: 'Username atau Password Tidak Ditemukan'});
                return;
            }else{

                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(200).send({
                        error: true,
                        accessToken: null,
                        message: "Password Salah"
                    });
                }

                const token = jwt.sign(
                    {
                        _id: user._id, 
                        name: user.name, 
                        nim_nidn: user.nim_nidn, 
                        email: user.email,
                        tipe: user.tipe
                    },
                    jwtSecret,
                    {
                        expiresIn: 3000, //50 minutes
                    },
                );
                res.status(200).json(
                    {
                        error : false,
                        data:{
                            id: user._id,
                            nim_nidn: user.nim_nidn,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            tipe: user.tipe,
                            accessToken: token,
                            expiresIn: 3000
                        }
                    }
                );
                return;
            }
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
