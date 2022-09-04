exports.userBooking = (bookingInfo) => {
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

    const hasFlightNoOrName = (bookingInfo.name|| bookingInfo.flightNumber) ? [
        {
            "type": "separator",
            "margin": "xl"
        },
        {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Name",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": bookingInfo.name,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ],
            "margin": "xl"
        },
        {
            "type": "box",
            "layout": "horizontal",
            "contents": [
            {
                "type": "text",
                "text": "Flight No.",
                "size": "sm",
                "color": "#555555",
                "flex": 0
            },
            {
                "type": "text",
                "text": bookingInfo.flightNumber,
                "size": "sm",
                "color": "#111111",
                "align": "end"
            }
            ],
            "margin": "xl"
        }
    ]
    :
    [
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
              "text": "Booking Info",
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
                  "contents": [],
                  "width": "12px",
                  "height": "12px",
                  "borderColor": "#6486E3",
                  "borderWidth": "3px",
                  "cornerRadius": "xxl"
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
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "width": "2px",
              "height": "12px",
              "backgroundColor": "#6486E3",
              "offsetStart": "5px"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "width": "12px",
                  "height": "12px",
                  "borderColor": "#6486E3",
                  "borderWidth": "3px",
                  "cornerRadius": "xxl"
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
                },
                ...hasFlightNoOrName
              ]
            },
            {
              "type": "separator",
              "margin": "xl"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "margin": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "Booking ID",
                  "size": "xs",
                  "color": "#aaaaaa",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `#${bookingInfo.bookingId}`,
                  "color": "#aaaaaa",
                  "size": "xs",
                  "align": "end"
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