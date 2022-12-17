  exports.jobNotification = (bookingId, province) => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "flex": 0,
                  "cornerRadius": "xxl",
                  "borderWidth": "medium",
                  "borderColor": "#1e3a8a",
                  "height": "10px",
                  "width": "10px"
                },
                {
                  "type": "text",
                  "text": province.from,
                  "weight": "bold",
                  "size": "lg",
                  "wrap": true,
                  "margin": "md",
                  "offsetBottom": "xs"
                }
              ],
              "alignItems": "center",
              "offsetTop": "none"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "width": "2px",
              "height": "10px",
              "backgroundColor": "#1e3a8a",
              "offsetStart": "sm",
              "offsetBottom": "sm"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "flex": 0,
                  "cornerRadius": "xxl",
                  "borderWidth": "medium",
                  "borderColor": "#1e3a8a",
                  "height": "10px",
                  "width": "10px"
                },
                {
                  "type": "text",
                  "text": province.to,
                  "weight": "bold",
                  "size": "lg",
                  "wrap": true,
                  "margin": "md",
                  "offsetBottom": "xs"
                }
              ],
              "alignItems": "center",
              "offsetBottom": "md"
            },
            {
              "type": "text",
              "text": "กดปุ่มด้านล่างหรือใช้เมนู \"Job Board\" เพื่อดูรายละเอียดงาน",
              "wrap": true,
              "size": "sm",
              "margin": "none",
              "offsetBottom": "xs"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Job Board",
                    "uri": `https://liff.line.me/1657246657-XxVxBO25?bookingId=${bookingId}`
                  },
                  "color": "#ffffff",
                  "height": "sm"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md",
              "margin": "lg"
            }
          ]
        }
      }

    return card
}