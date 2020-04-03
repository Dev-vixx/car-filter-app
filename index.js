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
app.use(helmet())
app.use(express.urlencoded({ extended: false }))    
app.use(express.json());

// trying to keep it all in one file
app.use('/hi', require('./routes/csv-to-json'))

app.get('/', (req, res) => {
  res.json({
    name: 'victor okoro iroka',
    phone: '[+2347088442494, +2348066095738]',
    email: 'iroka.victor@yahoo.com',
    github_url: 'https://github.com/dev-vixx',
    bio: 'my name is iroka victor okoro, and am a software engineer.',
    skills: [
      {
        python: 'flask',
        level: 'pro',
        time: '4yrs'
      },
      {
        js: ['node', 'nest', 'hapi'],
        level: 'pro',
        time: '6yrs'
      }
    ]
  })
})

// db instance
require('./db_connection')

// Starting the server
app.listen(process.env.PORT, () =>
  console.log(`server started on port http://localhost:${process.env.PORT}`)
)
