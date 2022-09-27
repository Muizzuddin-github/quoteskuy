import express from 'express'
import router from './routes/route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'



const app  = express()

dotenv.config()
app.use(cors()) // can be accessed outside the domain

const port = process.env.PORT || 3000 || 9001 || 5000

// check mongodb connection
app.use(async function(req,res,next){

    try{
       await mongoose.connect(process.env.DATABASE_CLIENT)
        next()
    }catch(err){
        res.status(500).json({msg : err.message})
    }

})

app.use('/quotes',router)
app.use(function(req,res){
    res.status(404).json({msg : 'not found'})
})

app.listen(process.env.PORT)
