import axios from "axios";
import pointInPolygon from 'point-in-polygon'

//geocoding API
export const areaCalculation = async (address) => {
    //polygon coordinates [x, y]
    const triangleCoords = [[-80.19, 25.774], [-66.118, 18.466], [-64.757, 32.321]];
    //point coordinates [x, y]
    const point = [-70.31294531249999, 26.43079719103903]
    console.log(pointInPolygon(point, triangleCoords))

    //getting google maps api library for polygon
    // try {
    //     const loader = new Loader({
    //         apiKey: "",
    //         libraries: ["geometry"]
    //       });

    //     loader.load().then((googlemaps) => {
    //         //polygon coorinates
    //         const triangleCoords = [
    //             { lat: 25.774, lng: -80.19 },
    //             { lat: 18.466, lng: -66.118 },
    //             { lat: 32.321, lng: -64.757 },
    //         ];
            
    //         //converting latLng to geometrical coordinates
    //         const currPosition = new googlemaps.maps.LatLng( 25.774, -80.19 )
    //         console.log(currPosition)

    //         //creating polygon
    //         const bermudaTriangle = new googlemaps.maps.Polygon({ paths: triangleCoords });
            
    //         //check if address's in polygon
    //         const result = googlemaps.maps.geometry.poly.containsLocation(
    //             currPosition,
    //             bermudaTriangle
    //         )

    //         return result
    //     }).catch((err) => {
    //         console.log(err)
    //     });

    // } catch (err) {
    //     return err
    // }
}