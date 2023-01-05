exports.defaultDriverMessage = () => {
    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "กระบวนการ",
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "text",
              "text": "1. กรุณาส่งข้อมูลของคุณ"
            },
            {
              "type": "text",
              "text": "2. ส่งรูปถ่ายของคุณมาในแชทนี้"
            },
            {
              "type": "text",
              "text": "3. คณะกรรมการจะส่งข้อความถึงคุณโดยเร็วที่สุดทาง Line (ใช้เวลาประมาน 2 วันทำการ)",
              "wrap": true
            },
            {
              "type": "text",
              "text": "COD - คณะกรรมการขับเคลื่อน",
              "margin": "xl"
            }
          ],
          "paddingTop": "lg"
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
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "สมัครสมาชิก",
                    "uri": "https://liff.line.me/1657246657-4pdxrLem"
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