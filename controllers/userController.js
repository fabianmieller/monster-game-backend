const { User } = require('../models')

exports.getUsers = (req, res, next) => {
  User.findAll().then(data => {
    res.status(200).json({ data })
  }).catch(error => {
    res.status(500).json({ error })
  })
}
