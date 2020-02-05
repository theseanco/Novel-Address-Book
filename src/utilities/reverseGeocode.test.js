import reverseGeocode from './reverseGeocode';

/*

Use specific mocks to replicate google maps API responses to test function cases

*/


describe('reverse geocode tests', () => {
  it('should return the correct processed address', () => {
    window.google.maps.Geocoder = class {
      geocode(input, callback) {
        const response = {
          status: 'OK',
          results: [
            {
              formatted_address: '1 fake road, fake town, fakington'
            }
          ] 
        }

        callback(response.results, response.status)
      }
    }

    expect(reverseGeocode('input')).resolves.toEqual('1 fake road, fake town, fakington');
  });

  it('should return an error when there is one', () => {
    window.google.maps.Geocoder = class {
      geocode(input, callback) {
        const response = {
          status: 'FAILURE STATUS CODE',
        }

        callback(response.results, response.status)
      }
    }

    expect(reverseGeocode('input')).rejects.toEqual('FAILURE STATUS CODE');
  });
})