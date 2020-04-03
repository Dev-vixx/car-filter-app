const { Sequelize } = require('sequelize')


// i displayed the db connection cause it wont 
// connect using node env
const sequelize = new Sequelize(
  "heroku_78a1def128e7043",
  "bc42f0b6e62d34",
  'dd1f74e6',
  // process.env.db /* db name */,
  // process.env.USER /* db username*/,
  // process.env.PWD /*db user password */,
  {
    dialect: 'mysql',
    host:  'us-cdbr-iron-east-01.cleardb.net'
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('db connection successful')
  })
  .catch(err => console.log('db connection error'))

// exporting the new instance of the db
module.exports = sequelize
