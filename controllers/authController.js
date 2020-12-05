const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const { User } = require('../models')

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
