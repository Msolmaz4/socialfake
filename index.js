import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Auth from './Routes/Auth.js'
import UserRoute from './Routes/UserRoute.js'


dotenv.config()

const app =express()
//bodyparser asiri yuklenmede vokmeyi onliyor
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))


//burada ekledigim useNewurl ve dogeri useNified momgoo fereksinimi
//yukaridakini sildim yine calisti bu yeni uygulamada gelmis 
//momgoda databaseacces bir yeni database olusturduk sonra buradaki sifre password oluyor dikkat
//sonra env actik oprya kopyaladik 


mongoose.connect(process.env.MONGO_DB,{useNewUrlParser :true , useUnifiedTopology: true})
.then(()=>app.listen(process.env.PORT ,()=>console.log(`listenig port ${process.env.PORT}`)))

//router 
app.use('/auth', Auth)
app.use('/user', UserRoute)