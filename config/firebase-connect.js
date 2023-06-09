const { credential } = require('firebase-admin')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('../cert/cert.json')

const firebaseConfig = {
    apiKey: "AIzaSyDJg2Q4mzNPJ2_JpFsYIEobRMnqsSj7abw",
    authDomain: "express-firebase-a4bc1.firebaseapp.com",
    databaseURL: "https://express-firebase-a4bc1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "express-firebase-a4bc1",
    storageBucket: "express-firebase-a4bc1.appspot.com",
    messagingSenderId: "645705794489",
    appId: "1:645705794489:web:b541eb5feaee62d7caec68",
    measurementId: "G-6478EMKBDE",
    credential: cert(serviceAccount)
};

initializeApp(firebaseConfig)

const db = getFirestore()

module.exports = db