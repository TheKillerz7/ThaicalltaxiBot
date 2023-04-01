const moment = require("moment")

exports.bookingAction = (bookingInfo, action, title, color, driverInfo, total) => {
  let startingDate = []
  let pickupDateStart = ""
  if (bookingInfo.bookingInfo.start?.pickupDate === "ASAP" || bookingInfo.bookingInfo.pickupDate === "ASAP") {
    pickupDateStart = "เร็วที่สุดเท่าที่จะเป็นไปได้"
  } else {
    startingDate = bookingInfo.bookingInfo.start?.pickupDate.split("/").reverse() || bookingInfo.bookingInfo.pickupDate.split("/").reverse()
    pickupDateStart = `${bookingInfo.bookingInfo.start?.pickupTime || bookingInfo.bookingInfo.pickupTime}, ${moment(new Date(startingDate[0], (parseInt(startingDate[1]) - 1).toString(), startingDate[2])).format("DD MMM YYYY")}`
  }

  const endingDate = bookingInfo.bookingInfo.end?.pickupDate.split("/").reverse() || ""
  const pickupDateEnd = moment(new Date(endingDate[0], (parseInt(endingDate[1]) - 1).toString(), endingDate[2])).format("DD MMM YYYY")

  const bookingMessage = bookingInfo.bookingInfo.message.en ? {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": `Your Message:`,
        "size": "sm",
        "wrap": true,
        "weight": "bold",
        "margin": "md"
      },
      {
        "type": "text",
        "text": `"${bookingInfo.bookingInfo.message.en}"`,
        "size": "sm",
        "wrap": true,
        "margin": "md"
      }
    ],
    "margin": "md"
  } : {
    "type": "filler"
  }

  const driverMessage = driverInfo.message.en ? {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": `Driver Message:`,
        "size": "sm",
        "wrap": true,
        "weight": "bold",
        "margin": "md"
      },
      {
        "type": "text",
        "text": `"${driverInfo.message.en}"`,
        "size": "sm",
        "wrap": true,
        "margin": "md"
      }
    ],
    "margin": "md"
  } : {
    "type": "filler"
  }
    
    const footer = action === "select" ?
    {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "box",
                "layout": "vertical",
                "margin": "md",
                "contents": [
                    {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Chat Now",
                          "uri": `https://liff.line.me/1657246657-1A9WmnMw?roomId=${bookingInfo.roomId}`
                        },
                        "color": "#ffffff",
                        "height": "sm"
                    }
                ],
                "backgroundColor": "#1e3a8a",
                "cornerRadius": "md",
                "offsetBottom": "none",
                "offsetTop": "none"
            }
        ]
    } : 
    {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "filler"
        }
      ]
  }

    const bookingFlex = bookingInfo.bookingType === "A2B" ? 
    {
      "type": "box",
      "layout": "vertical",
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
                  "text": "Course",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Booking ID",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Time/Date",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Passenger",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Luggage",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Car Type",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                }
              ],
              "flex": 0,
              "spacing": "xs"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "A to B",
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${(bookingInfo.id + 300000).toString().substring(0, 3) + "-" + (bookingInfo.id + 300000).toString().substring(3)}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${pickupDateStart}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.passenger.adult} adult, ${bookingInfo.bookingInfo.passenger.child} child`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.luggage.big} big, ${bookingInfo.bookingInfo.luggage.medium} medium`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": bookingInfo.bookingInfo.preferedCarType,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                }
              ],
              "spacing": "xs",
              "margin": "xl"
            }
          ]
        }
      ]
    }
    :
    {
      "type": "box",
      "layout": "vertical",
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
                  "text": "Course",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Booking ID",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Type",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Starting Date",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Ending Date",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Passenger",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Luggage",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Car Type",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                }
              ],
              "flex": 0,
              "spacing": "xs"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "Rent & Hire",
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${(bookingInfo.id + 300000).toString().substring(0, 3) + "-" + (bookingInfo.id + 300000).toString().substring(3)}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": bookingInfo.bookingInfo.type,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${pickupDateStart}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.end.pickupTime}, ${pickupDateEnd}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.passenger.adult} adult, ${bookingInfo.bookingInfo.passenger.child} child`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.luggage.big} big, ${bookingInfo.bookingInfo.luggage.medium} medium`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": bookingInfo.bookingInfo.preferedCarType,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                }
              ],
              "spacing": "xs",
              "margin": "xl"
            }
          ]
        }
      ]
    }

    const areaToVisit = bookingInfo.bookingType === "R&H" ? bookingInfo.bookingInfo.visit.map((area, index) => {
      return {
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
                "width": "10px",
                "height": "10px",
                "borderColor": "#f29422",
                "borderWidth": "2px",
                "offsetStart": "1px"
              },
              {
                "type": "filler"
              }
            ],
            "flex": 0,
            "width": "20px"
          },
          {
            "type": "text",
            "text": area.place.name,
            "gravity": "center",
            "flex": 4,
            "size": "sm"
          }
        ],
        "spacing": "lg",
        "cornerRadius": "30px"
      }
    }) : [
      {
        "type": "filler"
      }
    ]

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
            "color": color === "green" ? "#1DB446" : "#cc2727",
            "size": "sm"
          },
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
                    "text": bookingInfo.bookingInfo.start?.place.name || bookingInfo.bookingInfo.from.name,
                    "gravity": "center",
                    "flex": 4,
                    "size": "sm",
                    "weight": "bold"
                  }
                ],
                "spacing": "lg",
                "cornerRadius": "30px",
                "margin": "none"
              },
              ...areaToVisit,
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
                    "text": bookingInfo.bookingInfo.end?.place.name || bookingInfo.bookingInfo.to.name,
                    "gravity": "center",
                    "flex": 4,
                    "size": "sm",
                    "weight": "bold"
                  }
                ],
                "spacing": "lg",
                "margin": "sm",
                "cornerRadius": "30px"
              }
            ],
            "margin": "md"
          },
          {
            "type": "separator",
            "margin": "md",
            "color": "#828282"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              bookingFlex
            ]
          },
          {
            "type": "separator",
            "margin": "xl",
            "color": "#828282"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "PRICE",
                    "size": "md",
                    "color": "#555555",
                    "flex": 0,
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": `฿${total}`,
                    "size": "md",
                    "color": "#111111",
                    "align": "end",
                    "weight": "bold"
                  }
                ],
                "alignItems": "flex-end"
              },
              {
                "type": "text",
                "text": "*Include: Gas, User's Extra Orders,\nToll (Except DMK Tollway)",
                "size": "sm",
                "wrap": true,
                "color": "#111111"
              },
              {
                "type": "separator",
                "margin": "md",
                "color": "#828282"
              },
              bookingMessage,
              driverMessage,
            ]
          }
        ],
        "paddingBottom": "lg"
      },
      "footer": footer,
      "styles": {
        "footer": {
          "separator": false
        }
      }
    }

    return card
}