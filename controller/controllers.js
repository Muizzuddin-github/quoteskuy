import MongoQuote from '../model/schemaQuotes.js'
import MongoToday from '../model/schemaToday.js'

// handle response route

export const getRandom = async (req,res) => {

    try{
        const singleRandom = await MongoQuote.aggregate([
            {$unwind : "$quotes"},
            {$sample : {size : 1}},
            {$project : {
                _id : 0,
                'quotes._id' : 0,
                __v : 0,

            }}
        ])
        return res.status(200).json({msg : "success",data : singleRandom[0]})
    }catch(err){
        return res.status(500).json({msg : err.message,data : {}})
    }

}

export const randomKategori = async (req,res) => {
    const kategori = req.params.kategori

    try{
        const data = await MongoQuote.aggregate([
            {$match : {kategori}},
            {$unwind : '$quotes'},
            {$sample : {size : 1}},
            {$project : {
                _id : 0,
                'quotes._id' : 0,
                __v : 0,

            }}
        ])

        if(!data.length) return res.status(404).json({msg : "not found",data : {}})
        return res.status(200).json({msg : "success",data : data[0]})

    }catch(err){
        return res.status(500).json({msg : err.message,data : {}})
    }

}


export const getTodayQuote = async (req,res) => {
    try{
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

            return res.status(200).json({msg : "success",data : {
                kategori : singleRandom[0].kategori,
                quotes : singleRandom[0].quotes
            }})
        }

        return res.status(200).json({msg : "success", data : {
            kategori : dataToday[0].kategori,
            quotes : dataToday[0].quotes
        }})
    }catch(err){
        return res.status(500).json({msg : err.message,data : {}})
    }
}