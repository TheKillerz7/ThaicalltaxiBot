import pointInPolygon from 'point-in-polygon'
import areas from "../../areas.json"

//finding area
export const areaCalculation = (coordinates, areaType) => {
    //if the province doesn't have service
    // if (!areas[areaType]) return false

    const area = Object.keys(areas).find(area => pointInPolygon(coordinates, areas[area]))
    console.log(area)
    return area || false
}