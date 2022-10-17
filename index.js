import express from 'express'
import router from './routes/route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app  = express()

app.use(cors()) // can be accessed outside the domain
const port = process.env.PORT

// check mongodb connection
app.use(async function(req,res,next){

    try{
       await mongoose.connect(process.env.DATABASE_CLIENT)
        next()
    }catch(err){
        res.status(500).json({msg : err.message,data : {}})
    }

})

app.use('/api/quotes',router)
app.use(function(req,res){
    res.status(404).json({msg : 'Not found',data : {}})
})

app.listen(port)
