const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MONGODB

const initializeDataBase = async () => {
     await mongoose.connect(mongoUri).then(() => {
          console.log("Connected to Databse")
     })
          .catch((error) => {
          console.log("Error in connecting to Database", error)
     })
}

module.exports = {initializeDataBase}