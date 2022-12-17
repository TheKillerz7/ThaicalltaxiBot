  exports.confirmSelect = (code) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "ข้อกำหนดและเงื่อนไข",
              "weight": "bold",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "โปรดอ่านข้อกำหนด และกดตกลงเพื่อเป็นสมาชิก",
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
                    "type": "uri",
                    "label": "อ่าน",
                    "uri": `https://liff.line.me/1657246657-1A9WmnMw`
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
                    "label": "ตกลง",
                    "data": `type=agreeTerms&driverCode=${code}`
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