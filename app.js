const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const passport = require('passport')
require('./middlewares/passport')

const db = require('./models')

const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bearerToken())

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message, data })
})

process.on('SIGINT', async () => {
  await db.sequelize.connectionManager.close().then(_ => {
    console.log('Close the database connection.')
  }).catch(err => {
    if (err) {
      return console.error(err.message)
    }
  })
})

module.exports = app
