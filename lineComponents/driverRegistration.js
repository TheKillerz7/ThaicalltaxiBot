exports.driverRegistration = (driverInfo) => {
    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Registration Info",
              "weight": "bold",
              "color": "#1DB446",
              "size": "xs"
            },
            {
              "type": "text",
              "text": driverInfo.name,
              "weight": "bold",
              "size": "lg",
              "margin": "md"
            },
            {
              "type": "text",
              "text": `${driverInfo.carModel}, ${driverInfo.carType} car, ${driverInfo.carAge} years old`,
              "size": "xs",
              "color": "#828282",
              "wrap": true
            },
            {
              "type": "separator",
              "margin": "xxl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "xxl",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Phone number",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": driverInfo.phone,
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                }
              ]
            },
            {
              "type": "separator",
              "margin": "xxl"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "margin": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "Thank you for your registration!",
                  "size": "xs",
                  "color": "#A4A4A4",
                  "flex": 0
                }
              ]
            }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }

    return card
}