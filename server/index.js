require('dotenv').config()

const express = require('express')
const router = require('./routes')

const sequelize = require('./db/db')
const models = require('./db/models')

const cors = require('cors')

const PORT = process.env.PORT || 5050

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try{
        
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()