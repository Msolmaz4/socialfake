// kimlik digrukama

import express from "express";
const router = express.Router()


router.get('/' , async(req,res) =>{res.send('auth router')})


export default router