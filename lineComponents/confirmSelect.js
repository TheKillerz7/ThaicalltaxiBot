  exports.confirmSelect = (bookingId, driverId) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Terms & Conditions",
              "weight": "bold",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "If you book, it means you have agreed to the terms and conditions.",
              "wrap": true,
              "margin": "sm"
            }
          ],
          "paddingBottom": "md"
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "postback",
                    "label": "Read",
                    "data": `type=selectDriver&value=back&bookingId=${bookingId}`
                  },
                  "color": "#424242"
                }
              ],
              "backgroundColor": "#e0e0e0",
              "cornerRadius": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "postback",
                    "label": "Book",
                    "data": `type=selectDriver&value=select&bookingId=${bookingId}&driverId=${driverId}`
                  },
                  "color": "#ffffff"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md"
            }
          ],
          "flex": 0
        }
      }

    return card
}