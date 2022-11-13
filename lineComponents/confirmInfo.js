const moment = require("moment")

exports.confirmInfo = (bookingInfo, prices, total, driverInfo, carType) => {
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

  const bookingMessage = bookingInfo.bookingInfo.message ? {
    "type": "text",
    "text": `"${bookingInfo.bookingInfo.message.en}"`,
    "color": "#b58b0b",
    "size": "sm",
    "wrap": true,
    "margin": "md"
  } : {
    "type": "filler"
  }

  const arrival = driverInfo.arrival ? [{
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "text",
        "text": `Arrival Time`,
        "size": "sm",
        "color": "#555555",
        "flex": 0,
        "weight": "bold"
      },
      {
        "type": "text",
        "text": `${driverInfo.arrival} mins`,
        "size": "sm",
        "color": "#111111",
        "align": "end"
      }
    ]
  }] : [{
    "type": "filler"
  }]

  const driverMessage = driverInfo.message.en ? [{
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "text",
        "text": `Message`,
        "size": "sm",
        "color": "#555555",
        "flex": 0,
        "weight": "bold"
      },
      {
        "type": "text",
        "text": `${driverInfo.message.en}`,
        "size": "sm",
        "wrap": true,
        "color": "#111111",
        "align": "end"
      }
    ]
  }] : [{
    "type": "filler"
  }]

    const pricesFlexObj = prices.map((price, index) => {
      return {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": `${Object.keys(prices[index])}`,
            "size": "sm",
            "color": "#555555",
            "flex": 0,
            "weight": "bold"
          },
          {
            "type": "text",
            "text": `฿${price[Object.keys(prices[index])]}`,
            "size": "sm",
            "color": "#111111",
            "align": "end"
          }
        ]
      }
    })

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
                  "text": `${pickupDateStart}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": carType,
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
            "text": bookingInfo.bookingType === "A2B" ? "A to B Course" : "Rent & Hire",
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
          bookingMessage,
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
          {
            "type": "separator",
            "margin": "lg",
            "color": "#b8b8b8"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              ...arrival,
              ...driverMessage,
              ...pricesFlexObj,
              {
                "type": "separator",
                "margin": "lg",
                "color": "#b8b8b8"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "TOTAL",
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
                    "align": "end"
                  }
                ],
                "margin": "lg",
                "alignItems": "flex-end"
              }
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
                  "label": "Confirm",
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

driverRegisteredCard = (prices, total, driverInfo, number, selectedCarType) => {
  const vehicleInfo = JSON.parse(driverInfo.vehicleInfo)

  console.log(prices)
  const message = driverInfo.message ? {
    "type": "text",
    "text": driverInfo.message,
    "wrap": true,
    "size": "sm",
    "margin": "lg"
  } : {
    "type": "filler"
  }

  const arrival = driverInfo.arrival ? {
    "type": "text",
    "text": `Arrive in ${driverInfo.arrival} mins`,
    "margin": "none",
    "size": "xs",
    "color": "#fc433d",
    "offsetEnd": "md",
    "offsetBottom": "sm"
  } : {
    "type": "filler"
  }

  const pricesFlexObj = Object.keys(prices).map((title, index) => {
    return {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": `${title}`,
          "size": "sm",
          "color": "#555555",
          "flex": 0,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": `฿${prices[title]}`,
          "size": "sm",
          "color": "#111111",
          "align": "end"
        }
      ]
    }
  })

  const card = {
    "type": "bubble",
    "size": "kilo",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "OFFER PRICE",
          "weight": "bold",
          "color": "#1e3a8a",
          "size": "xs"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": `Driver No.${number}`,
              "weight": "bold",
              "size": "lg",
              "gravity": "bottom"
            },
            arrival
          ],
          "margin": "md",
          "alignItems": "flex-end"
        },
        {
          "type": "text",
          "text": `${vehicleInfo.carType}`,
          "size": "sm",
          "wrap": true,
          "color": "#5c5c5c"
        },
        message,
        
      ],
      "paddingBottom": "sm"
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "Exit All",
                "data": `type=confirmCancel&bookingId=${driverInfo.bookingId}&carType=${selectedCarType}`
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
                "label": "Book this driver",
                "data": `type=confirmSelectDriver&driverId=${driverInfo.driverId}&bookingId=${driverInfo.bookingId}&carType=${selectedCarType}`
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