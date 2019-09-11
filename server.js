const express = require('express')
const mongo = require("./mongo-dal.js")

const app = express()

app.use(express.json())

app.get('/api/todo/read/:refId', (req, res) => {
    const refId = req.params
    console.log(req.params)
    mongo.read(req.params.refId).then((result) => {
        res.send(result)
    })
})

app.delete('/api/todo/delete/:refId', (req, res) => {

    const refId = req.params.refId
    mongo.del(refId).then((result) => {
        res.send(result)
    })
})

app.post('/api/todo/create', (req, res) => {

    const obj = {
        refId: req.body.id,
        content: req.body.content
    }
    mongo.create(obj.refId, obj.content).then((result) => {
        res.send(result)
    })
})

app.post('/api/todo/update', (req, res) => {

    const obj = {
        refId: req.body.id,
        content: req.body.content
    }
    mongo.update(obj.refId, obj.content).then((result) => {
        res.send("updated")
    })
})

app.get('/api/todo/read', (req, res) => {
    mongo.display().then((result) => {
        res.send(result)
    })

})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`) //it wll show 5000 because I have put "export PORT=5000"
})