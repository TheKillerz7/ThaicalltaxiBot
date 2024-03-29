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
              "text": "ใบสมัครของคุณได้รับการอนุมัติ",
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "โปรดอ่านข้อกำหนดและเงื่อนไช และกดตกลงเพื่อเป็นสมาชิก",
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
                    "uri": `https://www.thai-taxi.com/q-and-a`
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