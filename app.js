const express = require('express')
const firebase = require('firebase-admin')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

const serviceAccount = require('./cert/user.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://express-firebase-a4bc1-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

app.get('/', (req, res) => {
    res.render('index', { name: 'Sultan' })
})

app.get("/todos", (req, res) => {
    firebase
        .database()
        .ref("/todos")
        .once("value")
        .then(snapshot => {
            const todos = snapshot.val();
            res.send(todos);
        })
});

app.post("/todos", (req, res) => {
    const todo = req.body.todo;

    firebase
        .database()
        .ref("/todos")
        .push(todo)
        .then(() => {
            console.log({ message: "Todo added successfully." });
            res.redirect('/')
        });
});

app.listen(3000, () => {
    console.log('app running on http://localhost:3000')
})