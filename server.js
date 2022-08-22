// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

  //Require
  const express = require('express')
  const bodyParser = require('body-parser')
  const http = require('http');
  const helmet = require('helmet')
  const compression = require('compression')
  var cors = require('cors');
  const { Server } = require("socket.io");
  
  //init express
  const app = express()
  const server = http.createServer(app);
  const io = new Server(server);
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  
  //routes require
  const dialogflowUserWebhook = require('./routes/user/dialogflowWebhook.js')
  const lineUserWebhook = require('./routes/user/lineWebhook.js')
  const booking = require('./routes/booking.js')
  const dialogflowDriverWebhook = require('./routes/driver/dialogflowWebhook.js')
  const lineDriverWebhook = require('./routes/driver/lineWebhook.js')
  const driver = require('./routes/drivers.js')
  const jobBoard = require('./routes/driver/jobBoard.js')
  const chat = require("./routes/chat")

  //app use
  app.use(bodyParser.json())
  app.use(compression())
  app.use(helmet())
  app.use(cors(corsOptions));
  app.set('socketio', io);
  
  //use routes
  app.use('/driver/dialogflowWebhook', dialogflowDriverWebhook)
  app.use('/driver/lineWebhook', lineDriverWebhook)
  app.use('/driver', driver)
  app.use('/driver/jobBoard', jobBoard)
  app.use('/user/dialogflowWebhook', dialogflowUserWebhook)
  app.use('/user/lineWebhook', lineUserWebhook)
  app.use('/booking', booking)
  app.use('/chat', chat)
  
  server.listen(5000, () => {
    console.log('listening on *:5000');
  });