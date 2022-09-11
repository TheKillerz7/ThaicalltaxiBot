let pricesFlexObj = []

exports.driverRegisteredCard = (prices, total, driverInfo) => {
  console.log(prices)
    pricesFlexObj = Object.keys(prices).map((title, index) => {
        return {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": title.toString(),
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": "฿ " + prices[title].toString(),
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
        }
    })

    const card = {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "size": "full",
        "position": "relative",
        "align": "center",
        "aspectRatio": "20:8",
        "aspectMode": "cover"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "OFFER PRICE",
            "weight": "bold",
            "color": "#1e3a8a",
            "size": "sm"
          },
          {
            "type": "text",
            "text": driverInfo.name,
            "weight": "bold",
            "size": "lg",
            "margin": "sm"
          },
          {
            "type": "text",
            "text": `${driverInfo.carModel}, ${driverInfo.carType} car, ${driverInfo.carAge} years old`,
            "size": "xs",
            "wrap": true
          },
          {
            "type": "separator",
            "margin": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "md",
            "spacing": "sm",
            "contents": [
              ...pricesFlexObj,
              {
                "type": "separator",
                "margin": "md"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "TOTAL",
                    "size": "sm",
                    "color": "#555555",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "฿ " + total.toString(),
                    "size": "sm",
                    "color": "#111111",
                    "align": "end",
                    "weight": "bold"
                  }
                ],
                "offsetTop": "sm"
              }
            ]
          },
          {
            "type": "separator",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "sm",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Select this driver",
                  "data": `driverId=${driverInfo.driverId}&bookingId=${driverInfo.bookingId}`,
                  "displayText": `Select ${driverInfo.name}`
                },
                "color": "#ffffff"
              }
            ],
            "backgroundColor": "#1e3a8a",
            "borderWidth": "none",
            "cornerRadius": "md",
            "spacing": "none",
            "offsetTop": "md"
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }

    return card
}