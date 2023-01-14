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
              "text": "After that:",
              "margin": "md",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "1. Get your price",
              "margin": "md",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "2. Choose a driver to book",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "*Choose within another 2 mins*",
              "color": "#ff334b",
              "size": "sm"
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