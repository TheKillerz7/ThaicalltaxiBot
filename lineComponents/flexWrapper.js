exports.flexWrapper = (flex, title) => {
    const wrapper = {
      "type": "flex",
      "altText": title || "This is flex message",
      "contents": {
        ...flex
      }
    }

    return wrapper
}