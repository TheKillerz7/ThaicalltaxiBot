  exports.waitForDriver = () => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Please wait 3 mins...",
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "And get your price",
              "margin": "md",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "For Booking:",
              "color": "#ff334b",
              "weight": "bold",
              "margin": "md",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "Choose a driver in 2 min",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
          ],
          "paddingStart": "xl",
          "paddingEnd": "xl"
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    

    return card
}