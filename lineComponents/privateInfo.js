exports.privateInfo = (bookingId) => {
    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Private Information",
              "weight": "bold",
              "color": "#1e3a8a",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "Please fill up the information in the link",
              "weight": "bold",
              "size": "xl",
              "margin": "md",
              "wrap": true
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Click here",
                    "uri": `https://liff.line.me/1657246657-9zmMqva5?bookingId=${bookingId}`
                  },
                  "color": "#ffffff"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md",
              "offsetTop": "6px",
              "margin": "lg"
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