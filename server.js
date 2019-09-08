const express = require('express')
const mongo = require("./mg.js")

const app = express()

app.use(express.json())

app.get('/api/todo/read/:refId', (req, res) => {
    const refId = req.params
    console.log(req.params)
    mongo.read(req.params.refId).then((result)=>{
        res.send(result)
    })
})

app.get('/api/todo/delete/:refId', (req, res) => {
    
    const refId = req.params.refId
    //console.log(req.params.refId)
    mongo.del(refId).then((result)=>{
        res.send(result)
    })
    
})

// app.get('/api/todo/create/:refId/:content', (req, res) => {
    
//     const refId = req.params.refId
//     const content = req.params.content

//     //console.log(req.params.refId)
//     mongo.create(refId,content).then((result)=>{
//         res.send(result)
//     })
    
// })
app.post('/api/todo/create', (req, res) => {
    
    const obj = {
        refId: req.body.id,
        content: req.body.content
    }
    // const refId = req.params.refId
    // const content = req.params.content

    //console.log(req.params.refId)
    mongo.create(obj.refId,obj.content).then((result)=>{
        res.send(result)
    })
    
})
// app.get('/api/todo/update/:refId/:content', (req, res) => {
    
//     const refId = req.params.refId
//     const content = req.params.content

//     //console.log(req.params.refId)
//     mongo.update(refId,content).then((result)=>{
//         res.send(result)
//     })
    
//})


app.post('/api/todo/update', (req, res) => {
    
    const obj = {
        refId: req.body.id,
        content: req.body.content
    }

    //console.log(req.params.refId)
    mongo.update(obj.refId,obj.content).then((result)=>{
        res.send("updated")
    })
    
})




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`) //it wll show 5000 because I have put "export PORT=5000"
})