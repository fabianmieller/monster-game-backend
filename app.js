const express = require('express')
const logger = require('morgan')

const db = require('./utils/database')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)

process.on('SIGINT', () => {
  db.close(err => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Close the database connection.')
  })
})

module.exports = app
