
  exports.commentFlex = () => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
                "type": "text",
                "text": "Thank you!",
                "margin": "xs",
                "wrap": true,
                "size": "lg",
                "weight": "bold"
            },
            {
                "type": "text",
                "text": "Hope to see you again.\nHave a nice time!\n- Duty Driver -",
                "margin": "md",
                "wrap": true,
                "size": "md",
            },
            {
                "type": "text",
                "text": "Leave your rating and comment about driver services.",
                "margin": "md",
                "color": "#1DB446",
                "wrap": true,
                "size": "xs",
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Rate Driver",
                    "uri": "https://liff.line.me/1657246657-bq6mzakA"
                  },
                  "height": "sm",
                  "color": "#ffffff"
                }
              ],
              "backgroundColor": "#1e3a8a",
              "cornerRadius": "md",
              "margin": "xl"
            }
          ],
          "paddingStart": "xl",
          "paddingEnd": "xl"
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    
    

    return card
}