const moment = require("moment")
  
  exports.jobAndBookingTable = (bookingInfo, title, postbackData) => {
    const jobs = bookingInfo.map((booking, index) => {
        booking.bookingInfo = JSON.parse(booking.bookingInfo)

        let startingDate = []
        let pickupDateStart = ""

        if (booking.bookingInfo.start?.pickupDate === "ASAP" || booking.bookingInfo.pickupDate === "ASAP") {
            pickupDateStart = "As soon as possible"
        } else {
            startingDate = booking.bookingInfo.start?.pickupDate.split("/").reverse() || booking.bookingInfo.pickupDate.split("/").reverse()
            pickupDateStart = `${booking.bookingInfo.start?.pickupTime || booking.bookingInfo.pickupTime}, ${moment(new Date(startingDate[0], (parseInt(startingDate[1]) - 1).toString(), startingDate[2])).format("DD MMM YYYY")}`
        }

        return (
            {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "md",
                        "spacing": "sm",
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
                                      "type": "text",
                                      "text": `${pickupDateStart}`,
                                      "size": "sm",
                                      "weight": "bold"
                                    },
                                    {
                                      "type": "text",
                                      "text": `${booking.bookingInfo.start?.place.name || booking.bookingInfo.from.name} > ${booking.bookingInfo.end?.place.name || booking.bookingInfo.to.name}`,
                                      "size": "sm",
                                      "wrap": true
                                    }
                                ],
                                "flex": 4
                                },
                                {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                      "type": "box",
                                      "layout": "vertical",
                                      "contents": [
                                          {
                                          "type": "text",
                                          "text": "More",
                                          "color": "#ffffff",
                                          "size": "sm"
                                          }
                                      ],
                                      "backgroundColor": "#1e3a8a",
                                      "justifyContent": "center",
                                      "alignItems": "center",
                                      "cornerRadius": "sm",
                                      "action": {
                                          "type": "postback",
                                          "label": "More",
                                          "data": `type=${postbackData}&bookingId=${booking.bookingId}`
                                      },
                                      "paddingAll": "md"
                                    }
                                ],
                                "justifyContent": "center",
                                "alignItems": "center",
                                "cornerRadius": "sm"
                            }
                            ]
                        }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "md",
                        "color": "#828282"
                    }
                ]
            }
        )
    })

    const card = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "BELL-MAN",
              "weight": "bold",
              "color": "#1DB446",
              "size": "sm"
            },
            {
              "type": "text",
              "text": title,
              "weight": "bold",
              "size": "xl",
              "margin": "sm"
            },
            ...jobs
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