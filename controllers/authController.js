const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const { JWT_TOKEN } = require('../config/envs')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const body = req.body
  const username = body.username
  const password = body.password
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = User.build({ username, password: hashedPw })
      return user.save()
    })
    .then(result => {
      res.status(201).json({ message: 'User created', userId: result.id })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.signin = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  let loadedUser
  User.findOne({ username }).then(user => {
    if (!user) {
      const error = new Error('A user with this username could not be found.')
      error.statusCode = 401
      throw error
    }
    loadedUser = user
    return bcrypt.compare(password, user.password)
  }).then(isEqual => {
    if (!isEqual) {
      const error = new Error('Wrong password!')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign({
      userId: loadedUser.id
    },
    JWT_TOKEN,
    {
      expiresIn: '24h'
    })

    res.status(200).json({ token })
  }).catch(err => {

  })
}

exports.getSessionToken = (req, res, next) => {
  const tmp_token = req.token
  const { userId } = jwt.verify(tmp_token, JWT_TOKEN) && jwt.decode(tmp_token)

  User.findOne({ id: userId }).then(user => {
    if (!user) {
      const error = new Error('A user with this userId could not be found.')
      error.statusCode = 401
      throw error
    }
    // TODO: move old token to blacklist

    const token = jwt.sign({
      userId: user.id
    },
    JWT_TOKEN,
    {
      expiresIn: '24h'
    })

    res.status(200).json({ token })
  }).catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  })
}

exports.signupWithProvider = (req, res, next) => {
  console.log('')
  console.log('User ID:', req.id)
  console.log('Provider:', req.provider)
  console.log('User avatar_url:', req._json.avatar_url || req._json.picture)
  console.log('User email:', (req.emails && req.emails[0].value) || '')
  console.log('')

  const oauth_provider = req.provider
  const oauth_uid = req.id
  const avatar_url = req._json.avatar_url || req._json.picture
  const email = (req.emails && req.emails[0].value) || ''

  User.findOrCreate({
    where: { oauth_provider, oauth_uid },
    options: { email, oauth_provider, oauth_uid, avatar_url }
  }).then(result => {
    const token = jwt.sign({
      userId: result[0].dataValues.id
    },
    JWT_TOKEN,
    {
      expiresIn: '1h'
    })

    res.redirect(`http://localhost:8080/auth/github/success?tmp_token=${token}`)
  }).catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  })
}
