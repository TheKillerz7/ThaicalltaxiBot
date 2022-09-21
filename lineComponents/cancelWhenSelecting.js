  exports.cancelWhenSelecting = (bookingId) => {
    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "weight": "bold",
              "size": "lg",
              "margin": "none",
              "wrap": true,
              "text": "Click button If you want to cancel",
              "offsetBottom": "sm"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "Cancel Here",
                    "data": `type=cancel&bookingId=${bookingId}`
                  },
                  "color": "#ffffff"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md",
              "offsetTop": "6px",
              "margin": "none"
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