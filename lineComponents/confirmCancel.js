  exports.confirmCancel = (bookingId) => {
    const card = {
      "type": "bubble",
      "size": "kilo",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Are you sure to exit?",
            "weight": "bold",
            "size": "lg"
          },
          {
            "type": "text",
            "text": "All driver's offer prices will be permanently removed.",
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
                  "label": "Back",
                  "data": `type=cancel&value=back&bookingId=${bookingId}`
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
                  "label": "Exit",
                  "data": `type=cancel&value=cancel&bookingId=${bookingId}`
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