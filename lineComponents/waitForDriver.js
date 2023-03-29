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
              "text": "Thanks for submitting...",
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "Operator will reply to you ASAP",
              "margin": "md",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "*Available time to reply*",
              "color": "#ff334b",
              "weight": "bold",
              "margin": "md",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "06.00 - 21.00 hours(Thailand)",
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