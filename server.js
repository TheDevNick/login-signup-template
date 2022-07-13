const { json } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// DB INFO / CONNECTION
const dbStr = require('./config/db').MONGO_URI
let dbName = 'registration-template'
mongoose.connect(dbStr, {useUnifiedTopology: true})
    .then(() => {
        console.log(`Connected to the ${dbName} database!`);
    })
    .catch(err => console.log(err))

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())





app.get('/', (req, res) => {
    res.send('hi nick!')
})

// LISTEN
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})