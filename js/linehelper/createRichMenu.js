const richMenu = require("../../richMenus.json")
const axios = require('axios');
const fs = require('fs')

exports.createRichMenu = async (type, menu) => {
    const token = type === "driver" ?
    "f9W4dZ1/zVgc5vhHWEKBnFQ+tMUk0lNT/Dcw+51LzDgfoG4fqF05IzuZH6Fh9ei4nYWeSqNC3iSOZ1TB6v110U1MJQlFGjOuaGfG05g1A4yIV0L6MIZxs9zlcTrFQnqa6Bo0NWzWoT0XHObKZ7cTvgdB04t89/1O/w1cDnyilFU=" 
    : 
    "UOtEcyfS+ePvdABT5jrJ+GlIg6OQDXOMQ+HydEz21ArK2n0fkG51Z6F9fNuV0J4qCN4t62dwvHyQp+SOhS9AmE2VVTdsVajLEtofJl7FR3h26/OiY1Ez1/JE7Gr5AwD8v2c/9CQJw6YcwXkqBpihLQdB04t89/1O/w1cDnyilFU="

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        // const richMenuId = await axios.post("https://api.line.me/v2/bot/richmenu", richMenu[type][menu], config)
        const richMenuIds = await axios.get("https://api.line.me/v2/bot/richmenu/list", config)
        config = {
            headers: {
                "Content-Type": "image/png",
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(richMenuIds.data.richmenus)
        const richMenuId = richMenuIds.data.richmenus[0].richMenuId
        // const uploadMenuImage = await axios.post(`https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`, fs.createReadStream(`./imgs/${menu}.jpg`), config)
        return uploadMenuImage
    } catch (error) {
        console.log(error)
    }
}