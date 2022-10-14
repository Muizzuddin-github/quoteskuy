import mongoose from "mongoose";

// schema collection quotes

const schemaEmbed = mongoose.Schema({
    'quote' : String,
    'author' : String
})

const schemaQuotes = mongoose.Schema({
    'kategori' : String,
    'quotes' : [schemaEmbed]
})

const MongoQuote =  mongoose.model('quotes',schemaQuotes,'quotes')
export default MongoQuote