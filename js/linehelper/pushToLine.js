const axios = require('axios');
const { ideahub } = require('googleapis/build/src/apis/ideahub');

exports.pushMessage = (req, id) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU='
        }
    }
    let body = {
        to: ideahub,
        messages: [
            {
            type: "text",
            text: JSON.stringify(req.body)
            }
        ]
        
    }


    return axios.post("https://api.line.me/v2/bot/message/push", body, config);
}