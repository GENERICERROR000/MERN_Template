const jwt = require('jsonwebtoken'),
  config = require('./configs/config'),
  Authentication = require('./controllers/authentication'),
  Examples = require('./controllers/examples')

// ########## Connect Routes With Controllers ##########
module.exports = (app) => {
// ----------> Unprotected Routes <----------
  app.get('/', (req, res) => {
    res.send("<h1>Sample API Hompage - HAHAHA</h1>")
  })

  app.get('/api/v1/auth', Authentication.auth)
  app.post('/api/v1/signin', Authentication.signin)
  app.post('/api/v1/signup', Authentication.signup)

  // ----------> Set Authentication <----------
  app.use(Authentication.checkToken)

  // ----------> Protected Routes <----------
  // app.post('/api/v1/issues/new', )
  app.put('/api/v1/issues', Example.updateExample)
  app.delete('/api/v1/issues', Example.deleteExample)

  // ----------> Set 404 <----------
  app.use((req, res) => {
    var err = new Error('Not Found')
    err.status = 404
    res.send(err)
  })
}
