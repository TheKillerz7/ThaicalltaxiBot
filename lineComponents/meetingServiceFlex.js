exports.meetingServiceFlex = (bookingId, driverId) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Do you need Airport Meeting Service by staff?",
              "weight": "bold",
              "wrap": true,
              "size": "lg"
            },
            {
              "type": "text",
              "text": "(100 Baht : to meeting staff directly)",
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
                    "label": "No",
                    "data": `type=meetingService&value=no&bookingId=${bookingId}&driverId=${driverId}`
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
                    "label": "Yes",
                    "data": `type=meetingService&value=yes&bookingId=${bookingId}&driverId=${driverId}`
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