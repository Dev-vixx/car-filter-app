const csv = require('csvtojson')
const path = require('path')
const Router = require('express').Router()
const { Op } = require('sequelize')
// db model
const carOwnersModel = require('../db_schema/car_owner')
// csv path
const pathToCsv = path.join(__dirname + '/car_ownsers_data.csv')

//
Router.get('/', async (req, res) => {
  const insertCsvToDb = () => {
    // converting from csv to json
    csv()
      .fromFile(pathToCsv)
      .then(jsonObj => {
        // NOTE: bulk inserting the csv file in json into the db      carOwnersModel
        jsonObj.map((carOwnerObjectInJson, index) => {
          if (index === jsonObj.length - 1) return res.redirect('/hi')
          carOwnersModel
            .create(carOwnerObjectInJson)
            //   error handler
            .catch(err => {
              console.log('opps!! an error occured in file csv-to-json.js', err)
            })
        })
      })
  }
  // query db if car owners are already inserted
  // NOTE: to avoid data redundancy
  try {
    let listOfCarOwners = await carOwnersModel.findAll()
    if (listOfCarOwners.length < 1) return insertCsvToDb()
    res.json({
      success: true,
      listOfCarOwners
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
})

// making a basic route to apply filters to the url and response
Router.get('/test/apply_filter', async (req, res) => {
  let filteredCars = await carOwnersModel.findAll({ where: req.query })
  if (filteredCars.length < 1)
    return res.status(400).json({
      error: true,
      filteredCars
    })
  res.json(filteredCars)
})

// i really didn't want split it into files
Router.post('/test/apply_filter', async (req, res) => {
  let { country, car_color, gender, start_year = 1950, end_year } = req.body
  let filteredCarCountries = []
  let filteredCarColors = []
  let filteredCarGender = []
  let filteredCarYears = []
  if (country) {
    filteredCarCountries = await carOwnersModel.findAll({
      where: { country }
    })
  }
  if (car_color) {
    let filteredCarColors = await carOwnersModel.findAll({
      where: { car_color }
    })
  }
  if (gender) {
    let filteredCarGender = await carOwnersModel.findAll({ where: { gender } })
  }
  if (start_year) {
    let filteredCarYears = await carOwnersModel.findAll({
      where: {
        car_model_year: {
          [Op.between]: [+start_year, +end_year]
        }
      }
    })
  }
  // spreading the results into a duplicate array
  let allresultDup = [
    ...filteredCarColors,
    ...filteredCarCountries,
    ...filteredCarGender,
    ...filteredCarYears
  ]
  // making them unique
  let result = new Set()
  result.add(allresultDup)
  res.json({ result: [...result], ok: true })
})

module.exports = Router
