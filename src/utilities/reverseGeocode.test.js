import reverseGeocode from './reverseGeocode';

/*

Use specific mocks to replicate google maps API responses to test function cases

*/


describe('reverse geocode tests', () => {
  it('should return the correct processed address', () => {
    window.google.maps.Geocoder = class {
      geocode() {
        return {
          status: 'OK',
          results: [
            {
              formatted_address: '1 fake road, fake town, fakington'
            }
          ] 
        }
      }
    }

    expect(reverseGeocode('input').then(data => expect(data).toEqual('1 fake road, fake town, fakington')));
  });

  it('should return an error when there is one', () => {
    window.google.maps.Geocoder = class {
      geocode() {
        return {
          status: 'FAILURE STATUS CODE',
          results: [
            {
              formatted_address: '1 fake road, fake town, fakington'
            }
          ] 
        }
      }
    }

    expect(reverseGeocode('input').then(data => {
      expect(data).not.toEqual('1 fake road, fake town, fakington');
      expect(data).toEqual('FAILURE STATUS CODE');
    }))
  });
})