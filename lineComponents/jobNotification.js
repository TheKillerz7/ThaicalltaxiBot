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
                  "contents": [
                    {
                      "type": "filler"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [],
                      "cornerRadius": "30px",
                      "height": "13px",
                      "width": "13px",
                      "borderColor": "#EF454D",
                      "borderWidth": "2px"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": province.from,
                  "weight": "bold",
                  "size": "md",
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
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "filler"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [],
                      "cornerRadius": "30px",
                      "width": "13px",
                      "height": "13px",
                      "borderColor": "#6486E3",
                      "borderWidth": "2px"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": province.to,
                  "weight": "bold",
                  "size": "md",
                  "wrap": true,
                  "margin": "md",
                  "offsetBottom": "xs"
                }
              ],
              "alignItems": "center",
              "margin": "md",
              "offsetBottom": "md"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "บอร์ดงาน",
                    "uri": `https://liff.line.me/1657246657-XxVxBO25?bookingId=${bookingId}`
                  },
                  "color": "#ffffff",
                  "height": "sm"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md",
              "margin": "sm"
            }
          ]
        }
      }

    return card
}