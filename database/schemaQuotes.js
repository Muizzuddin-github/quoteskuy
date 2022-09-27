import mongoose from "mongoose";

// schema database

const schemaEmbed = mongoose.Schema({
    'quote' : String,
    'author' : String
})

const schemaQuotes = mongoose.Schema({
    'kategori' : String,
    'quotes' : [schemaEmbed]
})

const mongo =  mongoose.model('quotes',schemaQuotes,'quotes')
export default mongo