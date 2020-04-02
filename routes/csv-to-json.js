const csv = require('csvtojson')
const path = require('path')
const Router = require('express').Router()
const fs = require('fs')
// db model
const carOwnersModel = require('../db_schema/car_owner')
// csv path
const pathToCsv = path.join(__dirname + '/car_ownsers_data.csv')

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

module.exports = Router
