  exports.jobNotification = () => {
    const card = {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "margin": "md",
            "contents": [
              {
                "type": "icon",
                "size": "xl",
                "url": "https://cdn-icons-png.flaticon.com/512/1827/1827370.png"
              },
              {
                "type": "text",
                "text": "มีงานใหม่เข้า! ดูที่บอร์ดงานเลย!",
                "size": "md",
                "margin": "lg",
                "flex": 0,
                "weight": "bold",
                "offsetBottom": "sm"
              }
            ],
            "paddingBottom": "xs"
          }
        ],
        "paddingTop": "md",
        "paddingBottom": "md"
      }
    }

    return card
}