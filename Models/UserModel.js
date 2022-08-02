import mongoose from 'mongoose' 

const UserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        }
        ,
        password:{
            type:String,
            required:true
        }
        ,
        firstname:{
            type:String,
            required:true
        }
        ,
        lastname:{
            type:String,
            required:true
        }
        ,
        isAdmin:{
            type:Boolean,
            required:false
        }
        ,
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesin:String,
        worksAt:String,
        relationShip:String,
        followers:[],
        followings:[]
    }
    ,{timestamps:true}
)
//disa aktrama
const UserModel = mongoose.model('Users', UserSchema)
export default UserModel

//follower takip edenleri array foksu
//