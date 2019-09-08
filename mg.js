const {
    MongoClient,
    ObjectID
} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
let db

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }
    db = client.db(databaseName)
    //read(1)
})

function read(refId) {
    //console.log(refId)
    let query = {
        refId: refId
    }
    //console.log(JSON.stringify(query))

    return db.collection('tasks').find(query).toArray().then((result) => {
        console.log(result)
        return result
    })
}

function del(refId){
    let query ={
        refId:refId
    }

    return db.collection('tasks').deleteOne(query).then((result)=>{
        return true
    }).catch((error)=>{
        return false
    })
}
function create(refId,content){
    return db.collection('tasks').insertOne({
        refId: refId,
        content: content
    }).then((result)=>{
        console.log(result.ops)
        return result.ops
    })
}

function update(refId,content){
    return db.collection('tasks').updateOne({
        refId: refId
    },{
        $set:{
            content: content
        }
    }).then((result)=>{
        console.log(result)
        return true
    })
}

module.exports = {
    read,del,create,update
}