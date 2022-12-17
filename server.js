// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

  //Require
  const express = require('express')
  const bodyParser = require('body-parser')
  const { createServer } = require('http');
  const helmet = require('helmet')
  const compression = require('compression')
  const cors = require('cors');
  const { Server } = require("socket.io");
  const axios = require('axios');
  const he = require('he');
  const { storeChatMessages } = require('./controllers/chattingController.js');
  const translations = (text, target) => {
    return axios.post("https://translation.googleapis.com/language/translate/v2", {}, {
        params: {
            q: text,
            target,
            key: "AIzaSyAyRniSWIgVCvj30C2q7d9YlMnN06ZzT_M"
        }
    })
}
  //init express
  const app = express()
  const server = createServer(app);
  const io = new Server(server, {  
    cors: {
    origin: "*",
    credentials: true
  }});

  const corsOptions = {
    origin: '*',
    credentials: true,
  };
  io.on('connection', (socket) => {
    console.log(socket.id, " connected")
    socket.on('join', (roomId) => {
      socket.join(roomId);
      console.log('a user: ', socket.id,  ' joined room: ' + roomId)
    })
    socket.on('leave', (roomId) => {
      socket.leave(roomId);
      console.log('a user: ', socket.id,  ' left room: ' + roomId)
    })
    socket.on('message', async (obj) => {
      const chatObj = {
        roomId: obj.roomId,
        senderId: obj.userId,
        senderType: obj.userType,
        messageType: "text",
        message: obj.inputValue
      }
      try {
        const translated = await translations(chatObj.message, chatObj.senderType === "user" ? "th" : "en")
        chatObj.translated = he.decode(translated.data.data.translations[0].translatedText)
        await storeChatMessages(chatObj) 
        const clients = await socket.in(obj.roomId).fetchSockets()
        console.log(clients)
        if (clients.length < 1) {
          if (chatObj.senderType === "driver") {
            const booking = (await getBookingByIdDB(obj.bookingId))[0]
            await pushMessage([textTemplate("new message")], "user", booking.userId)
          } else {
            const booking = (await getBookingWithPricesByIdDB(obj.bookingId))[0]
            await pushMessage([textTemplate("new message")], "driver", booking.driverId)
          }
        }
        io.to(obj.roomId).emit("message", chatObj);
        console.log('a user: ', socket.id,  ' send message: ' + obj.inputValue)
      } catch (error) {
        
      }
      
    })
    socket.on('disconnect', () => {
      console.log('a user: ', socket.id,  ' disconnect')
    })
  });
  
  //routes require
  const dialogflowUserWebhook = require('./routes/user/dialogflowWebhook.js')
  const lineUserWebhook = require('./routes/user/lineWebhook.js')
  const booking = require('./routes/booking.js')
  const dialogflowDriverWebhook = require('./routes/driver/dialogflowWebhook.js')
  const lineDriverWebhook = require('./routes/driver/lineWebhook.js')
  const driver = require('./routes/drivers.js')
  const user = require('./routes/users.js')
  const jobBoard = require('./routes/driver/jobBoard.js')
  const chat = require("./routes/chat");
  const { getBookingByIdDB, getBookingWithPricesByIdDB } = require('./models/booking.js');
  const { pushMessage } = require('./js/linehelper/pushToLine.js');
  const { textTemplate } = require('./js/helper/textTemplate.js');

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
  app.use('/user', user)
  app.use('/user/dialogflowWebhook', dialogflowUserWebhook)
  app.use('/user/lineWebhook', lineUserWebhook)
  app.use('/booking', booking)
  app.use('/chat', chat)
  
  server.listen(5000, () => {
    console.log('listening on *:5000');
  });