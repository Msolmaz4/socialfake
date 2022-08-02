import express from 'express'
import { getUser, updateUser,deleteUser, followUser } from '../Controllers/UserController.js'

const router = express.Router()



//deneme icin local deneme yayarken localhost500/user
//router.get('/' ,async (req,res)=>{res.send('user router')})

router.get('/:id', getUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow', followUser)



export default router