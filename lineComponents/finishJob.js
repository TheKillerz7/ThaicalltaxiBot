exports.finishJob = (bookingInfo) => {
    const hasMessage = bookingInfo.message ? {
        "type": "text",
        "size": "xs",
        "color": "#828282",
        "wrap": true,
        "text": bookingInfo.message,
        "margin": "sm"
    } 
    :
    {
        "type": "filler"
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
              "text": `Booking: ${bookingInfo.bookingId}`,
              "weight": "bold",
              "color": "#1DB446",
              "size": "xs",
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
                  "text": bookingInfo.from,
                  "weight": "bold",
                  "size": "md",
                  "margin": "md",
                  "decoration": "underline"
                }
              ],
              "cornerRadius": "none",
              "justifyContent": "center",
              "alignItems": "center",
              "margin": "md"
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
                  "text": bookingInfo.to,
                  "size": "md",
                  "margin": "md",
                  "weight": "bold",
                  "decoration": "underline"
                }
              ],
              "justifyContent": "center",
              "alignItems": "center"
            },
            hasMessage,
            {
              "type": "separator",
              "margin": "lg"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "xl",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Pick up",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": `${bookingInfo.pickupDate}, ${bookingInfo.pickupTime}`,
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Passenger",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": `${bookingInfo.passenger} people`,
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Luggage",
                      "size": "sm",
                      "color": "#555555"
                    },
                    {
                      "type": "text",
                      "text": `${bookingInfo.luggage} luggages`,
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                }
              ]
            },
            {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "postback",
                      "label": "Finish This Job",
                      "data": `type=finishJob&bookingId=${bookingInfo.bookingId}`
                    },
                    "color": "#ffffff",
                    "margin": "none"
                  }
                ],
                "backgroundColor": "#1e3a8a",
                "cornerRadius": "md",
                "margin": "lg",
                "offsetTop": "sm"
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