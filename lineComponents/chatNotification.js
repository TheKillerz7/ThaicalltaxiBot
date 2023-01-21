exports.chatNotification = (type) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "size": "xl",
                  "url": "https://cdn-icons-png.flaticon.com/512/724/724715.png"
                }
              ],
              "paddingBottom": "xs",
              "flex": 0,
              "paddingTop": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": type === "driver" ? "มีข้อความใหม่เข้าไปเช็คเลย!" : "New message in Chat Room!",
                  "size": type === "driver" ? "md" : "sm",
                  "margin": "lg",
                  "flex": 0,
                  "weight": "bold",
                  "offsetBottom": "sm"
                }
              ],
              "margin": "md",
              "paddingBottom": "sm"
            }
          ],
          "paddingTop": "xs",
          "paddingBottom": "xs"
        }
      }

    return card
}