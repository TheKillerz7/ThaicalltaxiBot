exports.carouselWrapper = (flex, title) => {
    const wrapper = {
      "type": "carousel",
      "contents": [...flex]
    }

    return wrapper
}