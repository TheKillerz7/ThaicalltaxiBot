const moment = require("moment")

exports.confirmInfo = (bookingInfo, prices, total, driverInfo, carType) => {
  let startingDate = []
  let pickupDateStart = ""

  if (bookingInfo.bookingInfo.start?.pickupDate === "ASAP" || bookingInfo.bookingInfo.pickupDate === "ASAP") {
    pickupDateStart = "As soon as possible"
  } else {
    startingDate = bookingInfo.bookingInfo.start?.pickupDate.split("/").reverse() || bookingInfo.bookingInfo.pickupDate.split("/").reverse()
    pickupDateStart = `${moment(new Date(startingDate[0], (parseInt(startingDate[1]) - 1).toString(), startingDate[2])).format("DD MMM YYYY")}`
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
      }
    ],
    "margin": "md"
  } : {
    "type": "filler"
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
                  "text": "Date",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Time",
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
                  "text": `${pickupDateStart}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.pickupTime}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.passenger.adult} Adults, ${bookingInfo.bookingInfo.passenger.child} Children`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.luggage.big} Big, ${bookingInfo.bookingInfo.luggage.medium} Medium`,
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
              "margin": "xxl"
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
                  "text": "Starting Time",
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
                  "text": "Ending Time",
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
                },
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
                  "text": `${bookingInfo.bookingInfo.start.pickupTime}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${pickupDateEnd}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.end.pickupTime}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.passenger.adult} Adults, ${bookingInfo.bookingInfo.passenger.child} Children`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": `${bookingInfo.bookingInfo.luggage.big} Big, ${bookingInfo.bookingInfo.luggage.medium} Medium`,
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
            "layout": "horizontal",
            "contents": [
              {
                "type": "filler"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [],
                "cornerRadius": "xxl",
                "width": "10px",
                "height": "10px",
                "borderColor": "#f29422",
                "borderWidth": "2px"
              },
              {
                "type": "filler"
              }
            ],
            "offsetTop": "5px",
            "flex": 0,
            "width": "20px"
          },
          {
            "type": "text",
            "text": area.place.name,
            "flex": 4,
            "size": "sm"
          }
        ],
        "spacing": "lg",
        "margin": "sm",
        "alignItems": "flex-start",
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
            "text": "Please confirm your price",
            "weight": "bold",
            "color": "#1DB446",
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
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Cancel",
                  "data": `type=cancel&value=cancel&bookingId=${driverInfo.bookingId}`
                },
                "color": "#424242",
                "height": "sm"
              }
            ],
            "backgroundColor": "#e0e0e0",
            "cornerRadius": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "md",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Book",
                  "data": `type=confirmInfo&driverId=${driverInfo.driverId}&bookingId=${driverInfo.bookingId}`
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
      },
      "styles": {
        "footer": {
          "separator": false
        }
      }
    }

    return card
}