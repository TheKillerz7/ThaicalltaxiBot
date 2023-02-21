exports.driverRegisteredCard = (prices, total, driverInfo, number, selectedCarType) => {
  const vehicleInfo = JSON.parse(driverInfo.vehicleInfo)

  const message = driverInfo.message.en ? {
    "type": "text",
    "text": `Driver Message: "${driverInfo.message.en}"`,
    "wrap": true,
    "size": "sm",
    "color": "#e07212",
    "weight": "bold",
    "margin": "lg"
  } : {
    "type": "filler"
  }

  const arrival = driverInfo.arrival ? {
    "type": "text",
    "text": `Arrive in ${driverInfo.arrival} mins`,
    "margin": "none",
    "size": "xs",
    "color": "#fc433d",
    "offsetEnd": "md",
    "offsetBottom": "xs"
  } : {
    "type": "filler"
  }

  const pricesFlexObj = prices.map((price, index) => {
    return {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": `${Object.keys(prices[index])}`,
          "size": "sm",
          "color": "#555555",
          "flex": 0,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": `฿${price[Object.keys(prices[index])]}`,
          "size": "sm",
          "color": "#111111",
          "align": "end"
        }
      ]
    }
  })

  const card = {
    "type": "bubble",
    "size": "kilo",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "OFFER PRICE",
          "weight": "bold",
          "color": "#1e3a8a",
          "size": "xs"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": `Driver ID: #${driverInfo.driverCode}`,
              "weight": "bold",
              "size": "lg",
              "gravity": "bottom",
              "flex": 0
            },
            arrival
          ],
          "margin": "md",
          "alignItems": "flex-end"
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "sm",
          "contents": [
            {
              "type": "icon",
              "size": "sm",
              "url": "https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            },
            {
              "type": "text",
              "text": "5.0",
              "size": "sm",
              "color": "#999999",
              "margin": "md",
              "flex": 0
            }
          ]
        },
        {
          "type": "text",
          "text": `${vehicleInfo.carType}`,
          "size": "md",
          "wrap": true,
          "weight": "bold",
          "color": "#5c5c5c"
        },
        {
          "type": "separator",
          "margin": "lg",
          "color": "#828282"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "PRICE",
                  "size": "md",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": `฿${total}`,
                  "size": "md",
                  "color": "#111111",
                  "align": "end"
                }
              ],
              "alignItems": "flex-end"
            },
            {
              "type": "text",
              "text": "*Include: Gas, User's Extra Orders,\nToll (Except DMK Tollway)",
              "size": "sm",
              "wrap": true,
              "color": "#111111"
            },
            {
              "type": "separator",
              "margin": "xl",
              "color": "#828282"
            },
            message,
          ]
        }
      ],
      "paddingBottom": "sm"
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "I Book This",
                "data": `type=selectDriver&value=select&bookingId=${driverInfo.bookingId}&driverId=${driverInfo.driverId}`
              },
              "color": "#ffffff",
              "height": "sm"
            }
          ],
          "backgroundColor": "#1e3a8a",
          "cornerRadius": "md",
          "offsetBottom": "none",
          "offsetTop": "none"
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": false
      }
    }
  }

  return card
}