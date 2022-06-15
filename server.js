if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

  //Require
  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser')
  
  //routes import
  const indexRouter = require('./routes/index')

  //app use
  app.use(bodyParser.json())
  
  //database connect
  // const mongoose = require('mongoose')
  // mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  // const db = mongoose.connection
  // db.on('error', error => console.error(error))
  // db.once('open', () => console.log('Connected to Mongoose'))
  
  //use routes
  app.use('/webhook', indexRouter)
  
  app.listen(process.env.PORT || 3000)