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
  const dialogflowUserWebhook = require('./routes/user/dialogflowWebhook.js')
  const lineUserWebhook = require('./routes/user/lineWebhook.js')
  const booking = require('./routes/booking.js')
  const dialogflowDriverWebhook = require('./routes/driver/dialogflowWebhook.js')
  const lineDriverWebhook = require('./routes/driver/lineWebhook.js')
  const driver = require('./routes/drivers.js')
  const jobBoard = require('./routes/driver/jobBoard.js')

  //app use
  app.use(bodyParser.json())
  app.use(compression())
  app.use(helmet())
  app.use(cors());
  
  //use routes for drivers
  app.use('/driver/dialogflowWebhook', dialogflowDriverWebhook)
  app.use('/driver/lineWebhook', lineDriverWebhook)
  app.use('/driver', driver)
  app.use('/driver/jobBoard', jobBoard)

  //use routes for users
  app.use('/user/dialogflowWebhook', dialogflowUserWebhook)
  app.use('/user/lineWebhook', lineUserWebhook)
  app.use('/booking', booking)
  
  app.listen(process.env.PORT || 5000)