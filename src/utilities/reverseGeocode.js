/*
definitely works
const reverseGeocode = (inputAddress) => {
  // initialise the geocoder
  const geocoder = new window.google.maps.Geocoder();
  // Use inputted 
  geocoder.geocode({ location: { lat: 54.9863511, lng: -1.5752196 } }, async (results, status) => {
    if(status === 'OK') {
      // return the best result in human-readable format
      console.log(results);
    } else {
      console.log(status)
    }
  })
}
*/

// Wrap google geocoder in a promise to better handle async fetching
const reverseGeocode = address => {
  return new Promise((resolve, reject) => {
    // Initialise the geocoder
    const geocoder = new window.google.maps.Geocoder();
    // use supplied address object to reverse-geocode location
    geocoder.geocode({ location: { lat: 54.9863511, lng: -1.5752196 } }, (results, status) => {
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