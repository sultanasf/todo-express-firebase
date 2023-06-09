const db = require('../config/firebase-connect')

const todo = db.collection('todos')

module.exports = todo