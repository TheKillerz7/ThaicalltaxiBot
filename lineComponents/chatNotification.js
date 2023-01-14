exports.chatNotification = (type) => {
    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "icon",
                  "size": "xl",
                  "url": "https://cdn-icons-png.flaticon.com/512/724/724715.png"
                },
                {
                  "type": "text",
                  "text": type === "driver" ? "มีข้อความใหม่ เข้าไปเช็คเลย!" : "New message in Chatting Room!",
                  "size": type === "driver" ? "md" : "sm",
                  "margin": "lg",
                  "flex": 0,
                  "weight": "bold",
                  "offsetBottom": "sm"
                }
              ],
              "paddingBottom": "xs"
            }
          ],
          "paddingTop": "md",
          "paddingBottom": "md"
        }
      }

    return card
}