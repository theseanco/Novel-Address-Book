import React from 'react';
import { render, getByTestId } from '@testing-library/react';
// import AddressList, { getAddresses } from './AddressList';
import * as AddressComponentry from './AddressList'

AddressComponentry.getAddresses = jest.fn();

/*
AddressComponentry.getAddresses = jest.fn(() => (
  [
      {
        name: "John Doe",
        notes: "friend from school",
        location: {
          latitude: 60.9618428,
          longitude: -1.4261618
        }
      },
      {
        name: "Alex NotDoe",
        notes: "Good at programming",
        location: {
          latitude: 50.9618428,
          longitude: -1.9261618
        }
      },
      {
        name: "Jane Maine",
        notes: "Probably A Lorem Ipsum Or Something",
        location: {
          latitude: 61.9618428,
          longitude: -4.4261618
        }
      }
    ]
))
*/

describe('AddressList tests', () => {
  it('Should render the correct number of child components', () => {
    const { container } = render(<AddressComponentry.AddressList />);
    expect(container.children.length).toBe(3);
  })
});