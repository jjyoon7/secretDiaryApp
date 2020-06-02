const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const feedRoutes = require('./routes/feed')

require('dotenv').config()

const uri = process.env.ATLAS_URI

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/feed', feedRoutes)

mongoose.connect(uri, {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true
                        })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('mongoDB database connection established successfully.')
})

app.use(cors())

module.exports = app