  exports.actionToDriverFlex = (title, message, color, buttonType) => {
    const button = {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": buttonType === "jobBoard" ? "Job Board" : "ฟอร์มการสมัคร",
            "uri": buttonType === "jobBoard" ? "https://liff.line.me/1657246657-XxVxBO25" : "https://liff.line.me/1657246657-4pdxrLem"
          },
          "color": "#ffffff"
        }
      ],
      "backgroundColor": "#1e3a8a",
      "cornerRadius": "md"
    }

    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": title,
              "weight": "bold",
              "size": "md",
              "color": color
            },
            buttonType !== "jobBoard" ?
            {
              "type": "text",
              "text": "กรุณากรอกข้อมูลที่ผิดพลาด หรือส่งรูปอีกครั้ง",
              "margin": "sm",
              "wrap": true
            }
            :
            {
              "type": "filler"
            },
            {
              "type": "text",
              "text": "ข้อความ: " + message,
              "margin": "sm",
              "wrap": true
            }
          ],
          "paddingBottom": "xs",
          "paddingTop": "xl"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            button
          ],
          "flex": 0
        }
      }

    return card
}