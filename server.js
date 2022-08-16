// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

  //Require
  const express = require('express')
  const bodyParser = require('body-parser')
  const helmet = require('helmet')
  const compression = require('compression')
  var cors = require('cors');
  var mysql = require('mysql');
  
  //init express
  const app = express()
  
  //routes require
  const webhook = require('./routes/webhook.js')
  const booking = require('./routes/booking.js')
  const driver = require('./routes/drivers.js')
  const jobBoard = require('./routes/jobBoard.js')

  //app use
  app.use(bodyParser.json())
  app.use(compression())
  app.use(helmet())
  app.use(cors());
  
  //use routes
  app.use('/webhook', webhook)
  app.use('/booking', booking)
  app.use('/driver', driver)
  app.use('/jobBoard', jobBoard)
  
  app.listen(process.env.PORT || 5000)