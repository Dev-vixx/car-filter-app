const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  'test' /* db name */,
  'vicmie' /* db username*/,
  'vicmie' /*db user password */,
  {
    dialect: 'mysql'
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
