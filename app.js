var express = require('express')
var logger = require('morgan')

const db = require('./utils/database')

var indexRouter = require('./routes/index')

var app = express()

// db.all('SELECT * FROM users', (err, rows) => {
//   if (err) {
//     throw err
//   }
//   rows.forEach(row => {
//     console.log(row)
//   })
// })

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

db.close(err => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Close the database connection.')
})

module.exports = app
