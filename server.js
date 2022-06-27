// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

  //Require
  import express from 'express'
  import bodyParser from 'body-parser'
  
  //init express
  const app = express()
  
  //routes import
  import webhook from './routes/webhook.js'

  //app use
  app.use(bodyParser.json())
  app.use(compression())
  app.use(helmet())
  
  //database connect (spreadsheet)

  // const mongoose = require('mongoose')
  // mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  // const db = mongoose.connection
  // db.on('error', error => console.error(error))
  // db.once('open', () => console.log('Connected to Mongoose'))
  
  //use routes
  app.use('/webhook', webhook)
  
  app.listen(process.env.PORT || 3000)