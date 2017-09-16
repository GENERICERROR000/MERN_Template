// TODO: Needs correct erros


const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const User = require('../models/user')

exports.auth = (req, res) => {
  var token = req.headers['x-access-token']
  if (!!token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        res.send({
          success: true,
          message: 'Token is valid.'
        })
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}

exports.signin = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    return res.status(422).send({
      success: false,
      error: 'You must provide email and password'
    })
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({
        success: false,
        error: 'Something went wrong'
      })
    }

    if (!existingUser) {
      return res.status(422).send({
        success: false,
        error: 'User not Found'
      })
    }

    existingUser.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(422).send({
          success: false,
          error: 'Something went wrong'
        })
      }

      if (isMatch) {
        const token = jwt.sign(existingUser, config.secret)

         return res.send({
          success: true,
          token: token
        })
      } else {
        return res.status(422).send({
          success: false,
          error: 'Incorrect password'
        })
      }

    })
  })
}

exports.signup =  (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password'
    })
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err) }

    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use'
      })
    }

    const user = new User({
      email: email,
      password: password
    })

    user.save((err, newUser) => {
      if(err) res.status(422).send({error: err, success: false})

      const token = jwt.sign(newUser, config.secret)

      res.send({
        success: true,
        token: token
      })
    })
  })
}

exports.checkToken = (req, res, next) => {
  var token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}
