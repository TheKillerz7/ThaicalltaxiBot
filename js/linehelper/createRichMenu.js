const richMenu = require("../../richMenus.json")
const axios = require('axios');
const fs = require('fs')

exports.createRichMenu = async (type, menu) => {
    const token = type === "driver" ?
    "xtaVGzaHPVGUw6GnYttFpkLw33AyuIJuSJDyLWFTASQjK3EPBfp2HCxTtBf93QAXaVoMwSvSP4pvqstI9tImt8h0zdzU1W5GW1jyJxXmJAq1duh5ttjtFsn+sNWVKrnpPI4Y+/x11VJWrAlninjNCgdB04t89/1O/w1cDnyilFU=" 
    : 
    "6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU="

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU=`
        }
    }

    let config1 = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer xtaVGzaHPVGUw6GnYttFpkLw33AyuIJuSJDyLWFTASQjK3EPBfp2HCxTtBf93QAXaVoMwSvSP4pvqstI9tImt8h0zdzU1W5GW1jyJxXmJAq1duh5ttjtFsn+sNWVKrnpPI4Y+/x11VJWrAlninjNCgdB04t89/1O/w1cDnyilFU=`
        }
    }

    try {
        const richMenuId = await axios.post("https://api.line.me/v2/bot/richmenu", richMenu["user"]["client"][1], config)
        const richMenuId1 = await axios.post("https://api.line.me/v2/bot/richmenu", richMenu["driver"]["driver"][1], config1)
        const imgconfig = {
            headers: {
                "Content-Type": "image/png",
                'Authorization': `Bearer 6mpFdHKdx5lTjiCXNqv4nnalzFJsYmgLD6LP5VhvmEHWVGCIvGnEb+gzwsJx8iJfIAvur9bFlPYE1tO+BKk/3xvEAYsWFdnGxpGv9hfgdWe5FAGKFfw1XoFybnRDOMOT2JWfEW9hP/DsmmUnL1txcgdB04t89/1O/w1cDnyilFU=`
            }
        }

        const imgconfig1 = {
            headers: {
                "Content-Type": "image/png",
                'Authorization': `Bearer xtaVGzaHPVGUw6GnYttFpkLw33AyuIJuSJDyLWFTASQjK3EPBfp2HCxTtBf93QAXaVoMwSvSP4pvqstI9tImt8h0zdzU1W5GW1jyJxXmJAq1duh5ttjtFsn+sNWVKrnpPI4Y+/x11VJWrAlninjNCgdB04t89/1O/w1cDnyilFU=`
            }
        }
        
        await axios.post(`https://api-data.line.me/v2/bot/richmenu/${richMenuId.data.richMenuId}/content`, fs.createReadStream(`./imgs/client.png`), imgconfig)
        await axios.post(`https://api-data.line.me/v2/bot/richmenu/${richMenuId1.data.richMenuId}/content`, fs.createReadStream(`./imgs/driver.png`), imgconfig1)
        
        await axios.post(`https://api.line.me/v2/bot/user/all/richmenu/${richMenuId.data.richMenuId}`, {}, config)
        await axios.post(`https://api.line.me/v2/bot/user/all/richmenu/${richMenuId1.data.richMenuId}`, {}, config1)
    } catch (error) {
        console.log(error)
    }
}