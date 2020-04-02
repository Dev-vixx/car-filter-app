const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const env = require('dotenv')
const logger = require('morgan')
env.config()


// setting up middleware
app.use(logger())
app.use(cors())
app.use('/hi', require('./routes/csv-to-json'))


app.get('/', (req,res)=>{
    res.json({
        home: "home"
    })
})

// db instance 
require('./db_connection')


// Starting the server
app.listen(process.env.PORT, () =>
  console.log(`server started on port http://localhost:${process.env.PORT}`)
)
