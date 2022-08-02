import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'

//get a user
//omve id params id kontrol ettiri
//burada dikkat edecegimiy sey sifreyi gondermeemk gerikzor


export const getUser = async (req,res)=>{
    const id = req.params.id
try {


    const user = await UserModel.findById(id) 
     // res.status(200).json(user)
    //bundab doalyi yenu degisken tanimalriy doc hepsini kapsar
    //bunu yaptiktan sonra guncellme yapmaksak yok der
    if(user)
    {
    const {password,...otherDetails} = user._doc
    res.status(200).json(otherDetails)
    }
    else{
        res.status(404).json('babakaybettin benu')
    }
    
} catch (error) {
    res.status(500).json({message:error.message})
    
}
   
}

//guncellme
export const  updateUser = async (req,res) =>{

    const id = req.params.id
    const { currentUserId ,currentUserAdminStatus,password} = req.body
    if( id === currentUserId || currentUserAdminStatus){
        try {
             
            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password,salt)

            }

            const user = await UserModel.findyByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json(error)
            
        }
    }
    else{
        res.status(403).json('acess denied')
    }
}

// silme

export const deleteUser = async (req,res) =>{
    const id = req.params.id

    const {currentUserId,currentUserAdminStatus} = req.body
    if(id === currentUserId || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json('user cop')
        } catch (error) {
            res.status(500).json(error)
        }
    }

    else{
        res.status(403).json('acess denied cop')
    }
}

//takip icin 

export const followUser = async (req,res) =>{
    const id = req.params.id
    const { currentUserId} =req.body
    if(currentUserId === id){
        res.status(403).json('takipteyiy')
    }
    else{
        try {
            const followUser =await UserModel.findById(followUser)
            const followingUser =await UserModel.findById(currentUserId)
            if(!followUser.followers.includes(currentUserId))
            {
                await followUser.updateOne({$push : {followers : currentUserId}})
                await followingUser.updateOne({push : {following:id}})
                res.status(200).json('baba iyisin takipdeyiz')
            }
            else{
                res.status(403).json('...........')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    }