exports.driverRegisteredCard = (prices, total, driverInfo, number, selectedCarType) => {
  const vehicleInfo = JSON.parse(driverInfo.vehicleInfo)

  const message = driverInfo.message ? {
    "type": "text",
    "text": `"${driverInfo.message.en}"`,
    "wrap": true,
    "size": "sm",
    "color": "#b58b0b",
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
    "offsetBottom": "sm"
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
              "text": `Driver No.${number}`,
              "weight": "bold",
              "size": "lg",
              "gravity": "bottom"
            },
            arrival
          ],
          "margin": "md",
          "alignItems": "flex-end"
        },
        {
          "type": "text",
          "text": `${vehicleInfo.carType}`,
          "size": "sm",
          "wrap": true,
          "color": "#5c5c5c"
        },
        message,
        {
          "type": "separator",
          "margin": "lg",
          "color": "#b8b8b8"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            ...pricesFlexObj,
            {
              "type": "separator",
              "margin": "lg",
              "color": "#b8b8b8"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "TOTAL",
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
              "margin": "lg",
              "alignItems": "flex-end"
            }
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
                "label": "Choose this driver",
                "data": `type=confirmSelectDriver&driverId=${driverInfo.driverId}&bookingId=${driverInfo.bookingId}&carType=${selectedCarType}`
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