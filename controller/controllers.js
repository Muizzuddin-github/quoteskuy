import mongo from "../database/schemaQuotes.js"


// handle response route

export const getRandom = async (req,res) => {

    try{
        const singleRandom = await mongo.aggregate([
            {$unwind : "$quotes"},
            {$sample : {size : 1}},
            {$project : {
                _id : 0,
                'quotes._id' : 0,
                __v : 0,

            }}
        ])
        return res.status(200).json({data : singleRandom[0]})
    }catch(err){
        return res.status(500).json({msg : err.message})
    }

}

export const randomKategori = async (req,res) => {
    const kategori = req.params.kategori

    try{
        const data = await mongo.aggregate([
            {$match : {kategori}},
            {$unwind : '$quotes'},
            {$sample : {size : 1}},
            {$project : {
                _id : 0,
                'quotes._id' : 0,
                __v : 0,

            }}
        ])

        if(!data.length) return res.status(404).json({msg : "not found"})


        return res.status(200).json({data : data[0]})

    }catch(err){
        return res.status(500).json({msg : err.message})
    }

}