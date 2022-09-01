const axios = require('axios')

exports.replyMessage = (req, type) => {
    const token = type === "driver" ?
    "f9W4dZ1/zVgc5vhHWEKBnFQ+tMUk0lNT/Dcw+51LzDgfoG4fqF05IzuZH6Fh9ei4nYWeSqNC3iSOZ1TB6v110U1MJQlFGjOuaGfG05g1A4yIV0L6MIZxs9zlcTrFQnqa6Bo0NWzWoT0XHObKZ7cTvgdB04t89/1O/w1cDnyilFU=" 
    : 
    "6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU="

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    let body = {
        replyToken: req.body.events[0].replyToken,
        messages: [
            {
            type: "text",
            text: JSON.stringify(req.body)
            }
        ]
        
    }

    return axios.post(`https://api.line.me/v2/bot/message/reply`, body, config);
  };