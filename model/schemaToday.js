import mongoose from "mongoose";


// schema collection today

const schemaEmbed = mongoose.Schema({
    'quote' : String,
    'author' : String
})

const schemaToday = mongoose.Schema({
    'kategori' : String,
    'quotes' : schemaEmbed,
    'date' : Date
})

const MongoToday =  mongoose.model('today',schemaToday,'today')
export default MongoToday