import axios from 'axios';
import fetchAddresses from './fetchAddresses';

// Simple axios unit tests

jest.mock('axios');

describe('tests for fetchAddresses', () => {
  it('should return addresses when successfully calling backend', () => {
    const addresses = [{name: 'fake', notes: 'fake'}];
    const response = {data: addresses};

    axios.get.mockResolvedValue(response);
    
    fetchAddresses().then(data => expect(data).toEqual(addresses));
    expect(axios.get).toHaveBeenCalledWith(
      'https://novel-address-book-backend.herokuapp.com/addresses'
    )
  })

  it('should return an error on failure', () => {
    axios.get.mockResolvedValue(
      Promise.reject(new Error('network error'))
    )
    expect(fetchAddresses()).rejects.toThrow('network error')
  })
})