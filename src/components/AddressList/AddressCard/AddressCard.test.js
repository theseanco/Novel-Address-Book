import React from 'react';
import { render, getByText, wait } from '@testing-library/react';
import AddressCard from './AddressCard';
import * as reverseGeocoding from '../../../utilities/reverseGeocode';
import { act } from 'react-dom/test-utils';

jest.mock('../../../utilities/reverseGeocode');

describe('AddressCard tests', () => {
  it('Should correctly render information when provided as props', async () => {
    await act(async () => {
      const { container } = render(
        <AddressCard 
        name={"John Doe"} 
        notes={"good at sports"} 
        location={ { latitude: 1, longitude: 60 } }/>
      );
      expect(getByText(container, /John Doe/)).toBeInTheDocument();
      expect(getByText(container, /good at sports/)).toBeInTheDocument();
    })
  })
  
  it('Should call the external function to retrieve address', async () => {
    // Mock reverse geocoding function
    reverseGeocoding.default = jest.fn(() => 'fake address')

    await act(async () => {
      const { container } = await render(
        <AddressCard 
        name={"John Doe"} 
        notes={"good at sports"} 
        location={ { latitude: 1, longitude: 60 } }/>
      )
      await wait(() => {
        // Text from mock function should end up in document
        expect(getByText(container, /fake address/)).toBeInTheDocument();
      });
    })
  })
});