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
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        // const richMenuId = await axios.post("https://api.line.me/v2/bot/richmenu", richMenu["driver"]["afterRegistered"][1], config)
        // const richMenuId1 = await axios.post("https://api.line.me/v2/bot/richmenu", richMenu["user"]["afterBooked"][1], config)
        // const richMenuIds = await axios.get("https://api.line.me/v2/bot/richmenu/list", config)
        config = {
            headers: {
                "Content-Type": "image/png",
                'Authorization': `Bearer ${token}`
            }
        }
        // console.log(richMenuIds.data.richmenus)
        // console.log(richMenuId)
        // const richMenuId = richMenuIds.data.richmenus[0].richMenuId
        const uploadMenuImage = await axios.post(`https://api-data.line.me/v2/bot/richmenu/richmenu-a0424c4e41316dcfed21aa630b972e93/content`, fs.createReadStream(`./imgs/afterRegistered.jpg`), config)
        return uploadMenuImage
    } catch (error) {
        console.log(error)
    }
}