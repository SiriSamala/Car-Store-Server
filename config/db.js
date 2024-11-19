const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sirisamala:21092004@in-aws.strgs.mongodb.net/cars-store?retryWrites=true&w=majority&appName=In-AWS")

const connection = mongoose.connection;

connection.on('connected', () => (console.log("DB Connected")))
connection.on('error', (error) => (console.log("DB Error")))

module.exports = mongoose

// const db = require('./config/db')