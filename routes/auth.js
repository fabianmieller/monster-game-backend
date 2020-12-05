const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/authController')

/* post users */
router.post(
  '/signup', [
    body('username')
      .trim()
      .notEmpty(),
    // .custom((value, { req }) => {
    // // check is username already registered
    // }),
    body('password').trim().isLength({ min: 5 })
  ],
  authController.signup
)

module.exports = router
