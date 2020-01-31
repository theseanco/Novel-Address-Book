import axios from 'axios';
import addAddressToDB from './addAddressToDB';

// axios unit tests similar to fetchAddress.test.js
// Testing implementation of 

jest.mock('axios');

describe('tests for addAddressToDB', () => {
  it('should return added address and process input lat/lng properly', () => {
    const response = {data: {}};

    axios.post.mockResolvedValue(response);
    
    addAddressToDB('fake', 'notes for fake', { lat: 40, lng: 1 }).then(data => expect(data).toEqual(response));
    expect(axios.post).toHaveBeenCalledWith(
      'https://novel-address-book-backend.herokuapp.com/addresses',
      {
        name: 'fake',
        notes: 'notes for fake',
        location: {
          latitude: 40,
          longitude: 1
        }
      }
    )
  })

  it('should return an error on failure', () => {
    axios.post.mockResolvedValue(
      Promise.reject(new Error('network error'))
    )
    expect(addAddressToDB('fake', 'notes for fake', { lat: 40, lng: 1 })).rejects.toThrow('network error')
  })
})