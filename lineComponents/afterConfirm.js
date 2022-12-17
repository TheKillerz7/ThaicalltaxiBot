exports.afterConfirm = (bookingId, roomId) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": `Booking Code: ${bookingId}`,
              "weight": "bold",
              "size": "md"
            },
            {
              "type": "text",
              "text": "Your booking is finished.\nNow, you can see your booking info at \"Current Booking\" and use \"Chatting Room\" for real-time and auto-translated chat.",
              "margin": "sm",
              "wrap": true
            }
          ],
          "paddingBottom": "xs"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "action": {
                    "type": "uri",
                    "label": "Chat Now",
                    "uri": `https://liff.line.me/1657246657-zkQEeOoL?roomId=${roomId}`
                  },
                  "color": "#ffffff",
                  "height": "sm"
                }
              ],
              "margin": "md",
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md"
            }
          ],
          "flex": 0,
          "paddingTop": "none"
        }
      }

    return card
}