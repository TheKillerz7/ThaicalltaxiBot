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
              "text": `Succeeded!`,
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": `Your Booking Code: ${bookingId}`,
              "weight": "bold",
              "margin": "md",
              "wrap": true
            },
            {
              "type": "text",
              "text": "Now, you can chat with driver.",
              "margin": "xs",
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