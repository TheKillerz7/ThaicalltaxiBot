const moment = require("moment")

  exports.jobNotification = (bookingData) => {
    let startingDate = []
    let pickupDateStart = ""
    if (bookingData.bookingInfo.start?.pickupDate === "ASAP" || bookingData.bookingInfo.pickupDate === "ASAP") {
      pickupDateStart = "ASAP"
    } else {
      startingDate = bookingData.bookingInfo.start?.pickupDate.split("/").reverse() || bookingData.bookingInfo.pickupDate.split("/").reverse()
      pickupDateStart = `${moment(new Date(startingDate[0], (parseInt(startingDate[1]) - 1).toString(), startingDate[2])).format("DD MMM")}`
    }

    const card = {
      "type": "bubble",
      "size": "kilo",
      "body": {
        "type": "box",
        "layout": "horizontal",
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
                            "height": "12px",
                            "width": "12px",
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
                        "text": bookingData.bookingInfo.start?.place.name || bookingData.bookingInfo.from.name,
                        "gravity": "center",
                        "flex": 4,
                        "size": "sm",
                        "weight": "bold"
                      }
                    ],
                    "spacing": "lg",
                    "cornerRadius": "30px"
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
                            "width": "12px",
                            "height": "12px",
                            "borderWidth": "2px",
                            "borderColor": "#6486E3"
                          },
                          {
                            "type": "filler"
                          }
                        ],
                        "flex": 0
                      },
                      {
                        "type": "text",
                        "text": bookingData.bookingInfo.end?.place.name || bookingData.bookingInfo.to.name,
                        "gravity": "center",
                        "flex": 4,
                        "size": "sm",
                        "weight": "bold"
                      }
                    ],
                    "spacing": "lg",
                    "cornerRadius": "30px"
                  }
                ]
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
                        "type": "text",
                        "text": pickupDateStart,
                        "size": "xs",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ],
                    "flex": 0,
                    "cornerRadius": "sm",
                    "backgroundColor": pickupDateStart === "ASAP" ? "#c22f2f" : "#24a647",
                    "paddingAll": "xs",
                    "paddingStart": "sm",
                    "paddingEnd": "sm"
                  },
                  pickupDateStart !== "ASAP" ? 
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": bookingData.bookingInfo.start?.pickupTime || bookingData.bookingInfo.pickupTime,
                        "size": "xs",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ],
                    "flex": 0,
                    "cornerRadius": "sm",
                    "backgroundColor": "#24a647",
                    "paddingAll": "xs",
                    "paddingStart": "sm",
                    "paddingEnd": "sm",
                    "margin": "sm"
                  } : 
                  {
                    "type": "filler"
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "icon",
                            "url": "https://thaicalltaxi-liff.vercel.app/002-user.png",
                            "size": "xxs"
                          }
                        ],
                        "flex": 0,
                        "paddingTop": "xs"
                      },
                      {
                        "type": "text",
                        "text": `${parseInt(bookingData.bookingInfo.passenger.adult) + parseInt(bookingData.bookingInfo.passenger.child)}`,
                        "size": "xs",
                        "color": "#ffffff",
                        "weight": "bold",
                        "flex": 0,
                        "margin": "sm"
                      }
                    ],
                    "flex": 0,
                    "cornerRadius": "sm",
                    "backgroundColor": "#263d91",
                    "paddingAll": "xs",
                    "paddingStart": "sm",
                    "paddingEnd": "sm",
                    "margin": "sm",
                    "justifyContent": "center",
                    "alignItems": "center"
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "icon",
                            "url": "https://thaicalltaxi-liff.vercel.app/003-portfolio.png",
                            "size": "xxs"
                          }
                        ],
                        "flex": 0,
                        "paddingTop": "xs"
                      },
                      {
                        "type": "text",
                        "text": `${parseInt(bookingData.bookingInfo.luggage.big) + parseInt(bookingData.bookingInfo.luggage.medium)}`,
                        "size": "xs",
                        "color": "#ffffff",
                        "flex": 0,
                        "weight": "bold",
                        "margin": "sm"
                      }
                    ],
                    "flex": 0,
                    "cornerRadius": "sm",
                    "backgroundColor": "#5d77d4",
                    "paddingAll": "xs",
                    "paddingStart": "sm",
                    "paddingEnd": "sm",
                    "margin": "sm",
                    "justifyContent": "center",
                    "alignItems": "center"
                  }
                ],
                "margin": "sm"
              }
            ],
            "paddingBottom": "md",
            "paddingTop": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "icon",
                    "url": "https://cdn-icons-png.flaticon.com/512/271/271228.png"
                  }
                ],
                "flex": 0,
                "justifyContent": "center",
                "alignItems": "center"
              }
            ],
            "flex": 0,
            "alignItems": "center",
            "justifyContent": "center"
          }
        ],
        "paddingBottom": "xs",
        "paddingTop": "xs",
        "action": {
          "type": "uri",
          "label": "action",
          "uri": `https://liff.line.me/1657246657-XxVxBO25?bookingId=${bookingData.bookingId}`
        }
      }
    }

    // const card = {
    //   "type": "bubble",
    //   "size": "kilo",
    //   "body": {
    //     "type": "box",
    //     "layout": "horizontal",
    //     "contents": [
    //       {
    //         "type": "box",
    //         "layout": "baseline",
    //         "contents": [
    //           {
    //             "type": "icon",
    //             "size": "xl",
    //             "url": "https://cdn-icons-png.flaticon.com/512/1827/1827370.png"
    //           }
    //         ],
    //         "paddingBottom": "xs",
    //         "flex": 0,
    //         "paddingTop": "md"
    //       },
    //       {
    //         "type": "box",
    //         "layout": "vertical",
    //         "contents": [
    //           {
    //             "type": "text",
    //             "text": "มีงานใหม่เข้าที่บอร์ดงาน!",
    //             "size": "md",
    //             "margin": "lg",
    //             "flex": 0,
    //             "weight": "bold",
    //             "offsetBottom": "sm"
    //           }
    //         ],
    //         "margin": "md",
    //         "paddingBottom": "sm"
    //       }
    //     ],
    //     "paddingTop": "xs",
    //     "paddingBottom": "xs"
    //   }
    // }

    return card
}