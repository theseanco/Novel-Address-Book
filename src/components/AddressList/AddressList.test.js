//TODO: is AddressComponentry right for this? Won't know until things are ironed out with data fetching

import React from 'react';
import { render, getByText, waitForElement, wait } from '@testing-library/react';
import AddressList from './AddressList'
import * as fetchAddresses from '../../utilities/fetchAddresses';
import { act } from 'react-dom/test-utils';

jest.mock('../../utilities/fetchAddresses');

describe('AddressList tests', () => {
  it('should initially display loading text', async () => {
    await act(async () => {
      fetchAddresses.default = jest.fn(() => [])
      const { getByText } = render(<AddressList />);
      expect(getByText(/Loading addresses/)).toBeInTheDocument();
    })
  })

  it('should show error text when fetch fails', async () => {
    fetchAddresses.default = jest.fn(() => {
      throw new Error();
    })
    await act(async () => {
      const { container } = await render(<AddressList />);
      await wait(() => {
        expect(getByText(container, /Error/)).toBeInTheDocument();
      })
    })
  })

  it('should display error conditions on an error', async () => {
    // Fake the results of fetch call, lat and long are passed down to AddressCard
    fetchAddresses.default = jest.fn(() => [
      {
        id: 1,
        name: "Fake Person 1",
        notes: "Notes for Fake Person 1",
        location: {
          latitude: 54.9863511,
          longitude: -1.5752196
        }
      },
      {
        id: 2,
        name: "Fake Person 2",
        notes: "Some other notes for Fake Person 2",
        location: {
          latitude: 55.9863511,
          longitude: -2.5752196
        }
      },
    ]
    )
    await act(async () => {
      const { container } = render(<AddressList />);
      await wait(() => {
        expect(getByText(container, "Fake Person 1")).toBeInTheDocument();
        expect(getByText(container, "Notes for Fake Person 1")).toBeInTheDocument();
        expect(getByText(container, "Fake Person 2")).toBeInTheDocument();
        expect(getByText(container, "Some other notes for Fake Person 2")).toBeInTheDocument();
      })
    })
  })

  /*

  TODO: This currently doesn't error correctly. Unsure why.

  it('should show error text when fetch fails', async () => {
    fetchAddresses.default = jest.fn(() => {
      throw new Error();
    })
    await act(async () => {
      const { container } = await render(<AddressList />);
      await wait(() => {
        expect(getByText(container, /Error/)).toBeInTheDocument();
      })
    })
  })
  */
});