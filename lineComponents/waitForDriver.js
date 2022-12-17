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
              "text": "Processing...",
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "1. Please wait for 1 min\n2. You will get a driver's price\n3. Choose one driver in 1 min",
              "margin": "xs",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "If you don't do anything, all info will be invalid after 1 minute.",
              "wrap": true,
              "margin": "md",
              "size": "sm",
              "color": "#cc2727"
            }
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