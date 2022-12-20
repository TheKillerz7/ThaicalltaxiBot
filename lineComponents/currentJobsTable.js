  const moment = require("moment")
  
  exports.currentJobsTable = (bookingInfo, title, postbackData) => {
    const colors = {
        date: ["#1e3a8a", "#c4a335", "#57b330", "#1e3a8a"],
        job: ["#d7e5fa", "#f7f5d2", "#d5fcc5", "#d7e5fa"],
        button: ["#4e6cc2", "#c2b64e", "#6dbd48", "#4e6cc2"]
    }
    const jobs = [...Array(4)].map((count, index) => {
        const bookings = bookingInfo.map((booking, i) => {
            const date = booking.bookingInfo.start?.pickupDate?.split("/")[0] || booking.bookingInfo.pickupDate.split("/")[0]
            
            if (moment(new Date().getTime() + (24 * 60 * 60 * 1000 * index)).format("DD") === date) {
                return {
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
                                    "text": booking.bookingInfo.start?.pickupTime || booking.bookingInfo.pickupTime,
                                    "size": "sm",
                                    "weight": "bold"
                                  },
                                  {
                                    "type": "text",
                                    "text": "dsa",
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
                                        "size": "xs"
                                      }
                                    ],
                                    "backgroundColor": colors.button[index],
                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "cornerRadius": "sm",
                                    "action": {
                                      "type": "postback",
                                      "label": "More",
                                      "data": `type=currentJobInfo&bookingId=${booking.bookingId}`
                                    },
                                    "paddingAll": "none",
                                    "paddingTop": "xs",
                                    "paddingBottom": "xs",
                                    "paddingStart": "md",
                                    "paddingEnd": "md"
                                  }
                                ],
                                "justifyContent": "center",
                                "alignItems": "center",
                                "cornerRadius": "sm",
                                "flex": 0
                              }
                            ]
                          }
                        ],
                        "backgroundColor": colors.job[index],
                        "cornerRadius": "sm",
                        "paddingStart": "lg",
                        "paddingEnd": "lg",
                        "paddingTop": "sm",
                        "paddingBottom": "sm"
                      }
                    ]
                }
            }

            return {
                "type": "filler"
            }
          })

        return {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
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
                            "text": moment(new Date().getTime() + (24 * 60 * 60 * 1000 * index)).format("DD MMM"),
                            "color": "#ffffff"
                          }
                        ],
                        "backgroundColor": colors.date[index],
                        "alignItems": "center",
                        "action": {
                          "type": "postback",
                          "label": "More",
                          "data": "ds"
                        },
                        "paddingAll": "none",
                        "paddingTop": "xs",
                        "paddingBottom": "xs",
                        "paddingStart": "md",
                        "paddingEnd": "md",
                        "cornerRadius": "sm"
                      }
                    ],
                    "alignItems": "flex-start"
                  },
                  ...(bookings.length ?
                    bookings
                    :
                    [{
                        "type": "text",
                        "text": "ไม่มีงานในวันที่นี้",
                        "size": "sm"
                    }])
                ],
                "margin": "lg"
              }
            ]
          }
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
              "text": "dsafg",
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