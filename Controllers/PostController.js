import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";

// YENIDEN OLUSTURMA
export const createPost = async (req,res)=>{
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json('post akiyor')
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//get

export const getPost = async (req,res)=>{
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update
export const updatePost = async (req,res)=>{
    const postId = req.params.id
    const {userId} = req.body

    try {
        
        const post = await PostModel.findById(postId)

        if(post.userId === userId){
            await post.updateOne({$set :req.body})
            res.status(200).json('post update')
        }
       else
       {
        res.status(403).json('bi ')
       }
    } catch (error) {
        res.status(500).json(error)
    }

}

// silek 

export const deletePost = async (req,res)=>{
    const id = req.params.id
    const {userId} = req.body


    try {
         const post = await PostModel.findById(id)
         if( post.userId === userId){
            await post.deleteOne()
            res.status(200).json('sildik baba')
         }
         else{
            res.status(403).json('bi ')
         }
    } catch (error) {
        res.status(500).json(error)
    }
}
// begenme



// Get Timeline Posts
export const getTimelinePosts = async (req,res) =>{
    const userId =req.params.id
    
    try {
        const currentUserPosts = await PostModel.find({userId :userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match : {
                    _id:new mongoose.Types.ObjectId(userId)
                }
                
            },
            {
                $lookup:{
                    from:'posts',
                    localField:'following',
                    foreignField:'userId',
                    as:'followingPosts'
                }
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
            
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort
        ((a,b)=>{ 
            return b.createdAt - a.createdAt
        }))
    } catch (error) {
        res.status(500).json(error)
    }
}