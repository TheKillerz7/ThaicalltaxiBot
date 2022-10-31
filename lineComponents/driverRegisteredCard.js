exports.driverRegisteredCard = (prices, total, driverInfo, number, selectedCarType) => {
  const vehicleInfo = JSON.parse(driverInfo.vehicleInfo)

  console.log(prices)
  const message = driverInfo.message ? {
    "type": "text",
    "text": driverInfo.message,
    "wrap": true,
    "size": "sm",
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

  const pricesFlexObj = Object.keys(prices).map((title, index) => {
    return {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": `${title}`,
          "size": "sm",
          "color": "#555555",
          "flex": 0,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": `฿${prices[title]}`,
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
          "text": `${vehicleInfo.carSize}`,
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
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "Exit All",
                "data": `type=confirmCancel&bookingId=${driverInfo.bookingId}&carSize=${selectedCarType}`
              },
              "color": "#424242",
              "height": "sm"
            }
          ],
          "backgroundColor": "#e0e0e0",
          "cornerRadius": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "Book this driver",
                "data": `type=confirmSelectDriver&driverId=${driverInfo.driverId}&bookingId=${driverInfo.bookingId}&carSize=${selectedCarType}`
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