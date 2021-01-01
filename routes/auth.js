const express = require('express')
const { body } = require('express-validator')
const passport = require('passport')

const router = express.Router()

const { User } = require('../models')
const authController = require('../controllers/authController')

/* post users */
router.post(
  '/signup', [
    body('username')
      .trim()
      .notEmpty()
      .custom(value => {
        return User.findOne({ where: { username: value } }).then(userExist => {
          if (userExist) {
            return Promise.reject('Username already exists!')
          }
        })
      }),
    body('password').trim().isLength({ min: 5 })
  ],
  authController.signup
)

router.post('/login', authController.signin)

router.get('/session_token', authController.getSessionToken)

/* github routes */
router.get('/github', passport.authenticate('github', {
  scope: [
    'user',
    'user:email'
  ],
}))

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/github/error'
}),
(req, res, next) => {
  authController.signupWithProvider(res.req.user, res, next)
})

router.get('/github/error', (req, res) => {
  res.status(500).json(res)
})

/* google routes */
// router.get('/google',
//   passport.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/plus.login'],
//   }))

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req, res, next) {
//     authController.signupWithProvider(res.req.user, res, next)
//   })

module.exports = router
