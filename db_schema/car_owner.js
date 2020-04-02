const { DataTypes } = require('sequelize')
const sequelize = require('../db_connection')

const carOwner = sequelize.define(
  'car_owner',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_model_year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
)

carOwner
  .sync({ force: false })
  .then(() => console.log('car owner db init'))
  .catch(err => console.log('error in db_car owners'))

module.exports = carOwner
