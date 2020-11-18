const express = require('express')
const router = express.Router()

/* GET home */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'hello' })
})

module.exports = router
