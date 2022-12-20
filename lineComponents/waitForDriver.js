  exports.waitForDriver = () => {
    const card = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Please wait 1 min...",
              "weight": "bold",
              "color": "#1DB446",
              "size": "lg"
            },
            {
              "type": "text",
              "text": "(For Price)",
              "margin": "sm",
              "weight": "bold",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "1. Drivers' price & car type will be arrived within 1 min",
              "margin": "xs",
              "wrap": true,
              "size": "md"
            },
            {
              "type": "text",
              "text": "(For Booking)",
              "weight": "bold",
              "margin": "md",
              "size": "md"
            },
            {
              "type": "text",
              "text": "2. Choose a driver you like within 1 min",
              "margin": "xs",
              "size": "md"
            },
            {
              "type": "text",
              "text": "Time to choose a driver will be expired after 1 min.",
              "wrap": true,
              "margin": "md",
              "size": "sm",
              "color": "#cc2727"
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