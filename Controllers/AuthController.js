import UserModel from "../Models/UserModel.js"
import bcrypt from 'bcrypt'


export const registerUser = async (req,res) => {
    const {username,password,firstname,lastname} = req.body;

 //sifreleme yapmak icin 
 const salt = await bcrypt.genSalt(10)
 const hashedPass = await bcrypt.hash(password ,salt)

 //burada dikkat etmemiy gereken sey passwort hashedpass esitlezecgiy yoks hata aliruy

    const newUser =new UserModel({username, password: hashedPass,firstname,lastname})

    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}