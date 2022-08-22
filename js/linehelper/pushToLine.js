const axios = require('axios');

exports.pushMessage = (req, type, id) => {
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
    console.log(token)

    let body = {
        to: id,
        messages: [...req]
    }


    return axios.post("https://api.line.me/v2/bot/message/push", body, config);
}