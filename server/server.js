const bodyParser = require('body-parser'),
  cors = require('cors'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  app = require('express')(),
  http = require('http').Server(app),
  config = require('./configs/config'),
  router = require('./router')

// ########## Create Server ##########
// ----------> Connect To DB <----------
mongoose.connect(config.database, (err) => {
  if(err) console.log(err)
  console.log("Connected to DB:", config.database)
})

// ----------> Set Middleware <----------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(logger('dev'))
app.use(config.headers)

// ----------> Set Routes <----------
router(app)

// ----------> Init Server <----------
http.listen(config.port, (err) => {
  if(err) console.log('Something went wrong', err)
  console.log('Server started on port 3000...')
})
