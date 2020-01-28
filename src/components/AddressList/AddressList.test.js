//TODO: is AddressComponentry right for this? Won't know until things are ironed out with data fetching

import React from 'react';
import { render } from '@testing-library/react';
import * as addressComponentry from './AddressList'

describe('AddressList tests', () => {
  it('Should render the correct number of child components', () => {
    // jest.spyOn(addressComponentry, 'getAddresses').mockReturnValue([{}]);
    const { container } = render(<addressComponentry.AddressList />);
    expect(container.children.length).toBe(3);
  })
});