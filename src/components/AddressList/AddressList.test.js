//TODO: is AddressComponentry right for this? Won't know until things are ironed out with data fetching

import React from 'react';
import { render, getByText, wait } from '@testing-library/react';
import AddressList from './AddressList'
import * as fetchAddresses from '../../utilities/fetchAddresses';
import { act } from 'react-dom/test-utils';

jest.mock('../../utilities/fetchAddresses');


describe('AddressList tests', () => {
  it('should initially display loading text', async () => {
    await act(async () => {
      const { getByText } = render(<AddressList fetching={false} />);
      expect(getByText(/Loading addresses/)).toBeInTheDocument();
    })
  })

  it('should show error text when fetch fails', async () => {
    fetchAddresses.default = jest.fn(() => {
      throw new Error();
    });
    await act(async () => {
      const { container } = await render(<AddressList fetching={true} setFetching={() => {}} />);
      await wait(() => {
        expect(getByText(container, /Error/)).toBeInTheDocument();
      })
    })
  })

  it('should render out the correct names when fetched from db', async () => {
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
    );
    await act(async () => {
      const { container } = render(<AddressList fetching={ true } setFetching={ () => {} } />);
      await wait(() => {
        expect(getByText(container, "Name: Fake Person 1")).toBeInTheDocument();
        expect(getByText(container, "Notes: Notes for Fake Person 1")).toBeInTheDocument();
        expect(getByText(container, "Name: Fake Person 2")).toBeInTheDocument();
        expect(getByText(container, "Notes: Some other notes for Fake Person 2")).toBeInTheDocument();
      })
    })
  })

  it('should show error text when fetch fails', async () => {
    fetchAddresses.default = jest.fn(() => {
      throw new Error();
    });
    await act(async () => {
      const { container } = await render(<AddressList fetching={true} setFetching={ () => {} } />);
      await wait(() => {
        expect(getByText(container, /Error/)).toBeInTheDocument();
      })
    })
  })
});