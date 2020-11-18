const User = require('../models/User')

exports.getUsers = (req, res, next) => {
  User.fetchAll().then(responseObj => {
    res.status(200).json(responseObj)
  }).catch(errResponseObj => {
    res.status(500).json(errResponseObj)
  })
}
