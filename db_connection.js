const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.db /* db name */,
  process.env.USER /* db username*/,
  process.env.PWD /*db user password */,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST
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
