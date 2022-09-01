const axios = require('axios');

exports.pushMessage = (req, type, id) => {
    const token = type === "driver" ?
    "xtaVGzaHPVGUw6GnYttFpkLw33AyuIJuSJDyLWFTASQjK3EPBfp2HCxTtBf93QAXaVoMwSvSP4pvqstI9tImt8h0zdzU1W5GW1jyJxXmJAq1duh5ttjtFsn+sNWVKrnpPI4Y+/x11VJWrAlninjNCgdB04t89/1O/w1cDnyilFU=" 
    : 
    "6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU="

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    let body = {
        to: id,
        messages: [...req]
    }


    return axios.post("https://api.line.me/v2/bot/message/push", body, config);
}