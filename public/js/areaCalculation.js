import pointInPolygon from 'point-in-polygon'

const areas = {
    bangkok: {
        bangkokA: [[99.189629, 16.0498747], [99.9312213, 14.6590091], [100.3241505, 13.9175539], [102.2257817, 13.6837549], [103.187032, 14.6799661], [102.7931295, 16.0909143], [100.2165147, 16.7822506], [99.3429304, 16.5109029], [99.189629, 16.0498747]],
        bangkokB: [[-83.19, 25.774], [-68.118, 18.466], [-66.757, 32.321]]
    }
}

//geocoding API
export const areaCalculation = (coordinates, areaType) => {
    const area = Object.keys(areas[areaType]).find(area => pointInPolygon(coordinates, areas[areaType][area]))
    console.log(area)
    //polygon coordinates [x, y]
    const triangleCoords = [[-80.19, 25.774], [-66.118, 18.466], [-64.757, 32.321]];
    //point coordinates [x, y]
    const point = [-70.31294531249999, 26.43079719103903]

    return area || false
}