const pointInPolygon = require('point-in-polygon')
const areas = require("../../areas.json")

//finding area
const areaCalculation = (coordinates, areaType) => {
    //if the province doesn't have service
    // if (!areas[areaType]) return false

    const area = Object.keys(areas).find(area => pointInPolygon(coordinates, areas[area]))
    console.log(area)
    return area || false
}

module.exports = {
    areaCalculation
}