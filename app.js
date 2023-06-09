const express = require('express')
const cors = require('cors')
const todo = require('./models/todo')
const db = require('./config/firebase-connect')
const { async } = require('@firebase/util')
const FirebaseFirestore = require('@google-cloud/firestore')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/todo', async (req, res) => {
    const data = req.body.todo
    await todo.add({
        todo: data
    })
    console.log(`Added list`)
    res.redirect('/')
})

app.get('/list', async (req, res) => {
    const citiesRef = todo;
    const snapshot = await citiesRef.get();
    const arr = []
    snapshot.forEach(doc => {
        arr.push(doc.id, doc.data());
    });
    res.send(arr)
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
