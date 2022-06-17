import axios from 'axios';

//geocoding API
export const geocodingAPI = (address) => {
    const geoObject = axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: "AIzaSyBbjxIWcwiaWvTlPuPn9lzOMhJCEwYAhu0"
        }
      })
    
    //returned Json
    return geoObject
}