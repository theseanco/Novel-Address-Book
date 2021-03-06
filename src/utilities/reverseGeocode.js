/*

Function using google reverse geocoding API to get a best address estimate from a latitude/longitude object

params:
locationObject: an object that can be interepreted by the google maps API: {lat: Number, lng: Number}. More information here https://developers.google.com/maps/documentation/javascript/geocoding

*/


// Wrap google geocoder in a promise to better handle async fetching
const reverseGeocode = locationObject => {
  return new Promise((resolve, reject) => {
    // Initialise the geocoder
    const geocoder = new window.google.maps.Geocoder();
    // use supplied address object to reverse-geocode location
    geocoder.geocode({ location: locationObject }, (results, status) => {
      if (status === 'OK') {
        // Resolve with correct result
        resolve(results[0].formatted_address);
      } else {
        // Throw the status
        reject(status);
      }    
    });    
  });
};

export default reverseGeocode;