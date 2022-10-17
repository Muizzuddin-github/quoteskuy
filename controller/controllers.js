import MongoQuote from '../model/schemaQuotes.js'
import MongoToday from '../model/schemaToday.js'
import MongoUsers from '../model/schemaUsers.js'
import bcrypt from 'bcryptjs'

// handle response route

export const getRandom = async (req,res) => {

    try{
        const appID = req.headers['x-api-id']
        const apikeyUser = req.headers['x-api-key']

        if(!apikeyUser) return res.status(401).json({msg : "Apikey tidak ada"})

        const checkUser = await MongoUsers.find({_id : appID})
        if(!checkUser.length) return res.status(404).json({msg : 'App id tidak ditemukan'})

        const checkApiKey = bcrypt.compareSync(apikeyUser,checkUser[0].apikey)
        if(!checkApiKey) return res.status(401).json({msg : "Apikey yang anda masukkan salah"})

        if(req.query.category){
            const data = await MongoQuote.aggregate([
                {$match : {kategori : req.query.category}},
                {$unwind : '$quotes'},
                {$sample : {size : 1}},
                {$project : {
                    _id : 0,
                    'quotes._id' : 0,
                    __v : 0,
    
                }}
            ])
    
            if(!data.length) return res.status(404).json({msg : "Data tidak ada",data : {}})
            return res.status(200).json({msg : "Success",data : data[0]})
        }

        const singleRandom = await MongoQuote.aggregate([
            {$unwind : "$quotes"},
            {$sample : {size : 1}},
            {$project : {
                _id : 0,
                'quotes._id' : 0,
                __v : 0,

            }}
        ])
        return res.status(200).json({msg : "Success",data : singleRandom[0]})
    }catch(err){
        return res.status(500).json({msg : err.message,data : {}})
    }

}

export const getTodayQuote = async (req,res) => {
    try{

        const appID = req.headers['x-api-id']
        const apikeyUser = req.headers['x-api-key']

        if(!apikeyUser) return res.status(401).json({msg : "Apikey tidak ada"})

        const checkUser = await MongoUsers.find({_id : appID})
        if(!checkUser.length) return res.status(404).json({msg : 'App id tidak ditemukan'})

        const checkApiKey = bcrypt.compareSync(apikeyUser,checkUser[0].apikey)
        if(!checkApiKey) return res.status(401).json({msg : "Apikey yang anda masukkan salah"})

        const dataToday = await MongoToday.aggregate([
            {$project : {__v : 0,"quotes._id" : 0}}
        ])

        // check length
        if(!dataToday.length){
            const singleRandom = await MongoQuote.aggregate([
                {$unwind : "$quotes"},
                {$sample : {size : 1}},
                {$project : {
                    _id : 0,
                    'quotes._id' : 0,
                    __v : 0,
    
                }}
            ])

            singleRandom[0].date = new Date()
            const addToday = new MongoToday(singleRandom[0])
            await addToday.save()

            return res.status(201).json({msg : "success",data : {
                kategori : singleRandom[0].kategori,
                quotes : singleRandom[0].quotes
            }})
        }
        const dateNow = new Date()
        const dateQuotes = new Date(dataToday[0].date)
        const getDateDay = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`
        const quotesDay =  `${dateQuotes.getDate()}-${dateQuotes.getMonth()}-${dateQuotes.getFullYear()}`

        // check date of day
        if(getDateDay !== quotesDay){
            // get random, add date, and update collection today
            const singleRandom = await MongoQuote.aggregate([
                {$unwind : "$quotes"},
                {$sample : {size : 1}},
                {$project : {
                    _id : 0,
                    'quotes._id' : 0,
                    __v : 0,
    
                }}
            ])

            singleRandom[0].date = new Date()
            await MongoToday.updateOne({_id : dataToday[0]._id},singleRandom[0])

            return res.status(200).json({msg : "Success",data : {
                kategori : singleRandom[0].kategori,
                quotes : singleRandom[0].quotes
            }})
        }

        return res.status(200).json({msg : "Success", data : {
            kategori : dataToday[0].kategori,
            quotes : dataToday[0].quotes
        }})
    }catch(err){
        return res.status(500).json({msg : err.message,data : {}})
    }
}