const moment = require("moment")

exports.bookingAction = (bookingInfo, action) => {
  let startingDate = []
  let pickupDateStart = ""
  if (bookingInfo.bookingInfo.start?.pickupDate === "ASAP" || bookingInfo.bookingInfo.pickupDate === "ASAP") {
    pickupDateStart = "As soon as possible"
  } else {
    startingDate = bookingInfo.bookingInfo.start?.pickupDate.split("/").reverse() || bookingInfo.bookingInfo.pickupDate.split("/").reverse()
    pickupDateStart = `${bookingInfo.bookingInfo.start?.pickupTime || bookingInfo.bookingInfo.pickupTime}, ${moment(new Date(startingDate[0], startingDate[1], startingDate[2])).format("DD MMM YYYY")}`
  }

  const endingDate = bookingInfo.bookingInfo.end?.pickupDate.split("/").reverse() || ""
  const pickupDateEnd = moment(new Date(endingDate[0], endingDate[1], endingDate[2])).format("DD MMM YYYY")

    const message = bookingInfo.bookingInfo.message.en ? {
      "type": "text",
      "text": `Message: "${bookingInfo.bookingInfo.message.en}"`,
      "wrap": true,
      "size": "sm",
      "color": "#b58b0b",
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
                          "label": "Chat",
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
                  "text": "Time",
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
                {
                  "type": "text",
                  "text": "Passengers",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Luggages",
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
                  "text": `${pickupDateStart}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": bookingInfo.bookingInfo.carType,
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
                  "text": "Car Type",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Passengers",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "Luggages",
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
                  "text": `${bookingInfo.bookingInfo.start.pickupTime}, ${pickupDateEnd}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": bookingInfo.bookingInfo.carType,
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
            "text": area.name,
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
            "text": action === "select" ? action === "reject" ? "You've been rejected" : "You've been selected" : "Booking's been canceled",
            "weight": "bold",
            "color": action === "select" ? "#1DB446" : "#cc2727",
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
                        "height": "14px",
                        "width": "14px",
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
              {
                "type": "box",
                "layout": "horizontal",
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
                            "type": "filler"
                          },
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "2px",
                            "backgroundColor": "#B7B7B7"
                          },
                          {
                            "type": "filler"
                          }
                        ],
                        "flex": 1
                      }
                    ],
                    "width": "12px"
                  },
                  {
                    "type": "text",
                    "gravity": "center",
                    "flex": 4,
                    "size": "xxs",
                    "color": "#ffffff",
                    "text": "."
                  }
                ],
                "spacing": "lg",
                "height": "8px"
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
                            "width": "2px",
                            "backgroundColor": "#B7B7B7"
                          },
                          {
                            "type": "filler"
                          }
                        ],
                        "flex": 1
                      }
                    ],
                    "width": "12px"
                  },
                  {
                    "type": "text",
                    "gravity": "center",
                    "flex": 4,
                    "size": "xxs",
                    "color": "#ffffff",
                    "text": "."
                  }
                ],
                "spacing": "lg",
                "height": "8px"
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
                        "width": "14px",
                        "height": "14px",
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
                "cornerRadius": "30px"
              }
            ],
            "margin": "md"
          },
          message,
          {
            "type": "separator",
            "margin": "md"
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
        ],
        "paddingBottom": "1px"
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