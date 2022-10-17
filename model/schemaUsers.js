import mongoose from "mongoose";

const schemaUSers = mongoose.Schema({
    nama : String,
    email : String,
    deskripsi : String,
    apikey : String,
    ubah : Number
})


const MongoUsers = mongoose.model('users',schemaUSers,'users')
export default MongoUsers