
var Batismo = require('../models/batismo')

module.exports.listar = () =>{
    return Batismo
            .find({},{ title:1,date:1,ref:1})
            .exec()
}


module.exports.listarBatisadoS = () =>{
    return Batismo.aggregate([
        { $addFields: 
            { "mylist": { $regexFind: { input: "$title", regex: "(?<=: ).*(?=\. Pai)" } } }},
        { $sort: 
            {mylista: 1}},
        {$group:
            {_id:null,listbatisados:{$push:{id:"$_id",batisado:"$mylist.match"}} }},
        {$project: 
            {_id:0,listbatisados:1 }}
    ]).exec();
}
module.exports.findById = id =>{
    return Batismo
            .find({_id :id})
            .exec()
}

module.exports.progenitores = () => {
    return Batismo
        .find({}, {_id: 1, pai: 1, mae: 1 })
        .exec()
}

module.exports.stats = () => {
     return Batismo.aggregate([
            {
                "$group": 
                { _id: "$date", "count" :{"$sum":1}}
             }
            ]
     ).exec()
}

module.exports.listarByAno = () =>{
    return Batismo.aggregate
    ([
        {
            "$group": 
            { _id: "$date"}
         }
        ]
 ).exec()
}

