// currently does not test loading state but it is done in coverage
import GeolocationField from './GeolocationField';
import { render, getByText, getByPlaceholderText, fireEvent, getByTestId, wait } from '@testing-library/react';
import React from 'react';

describe('GeolocationField tests', () => {
  it('should show placeholder when mounted', () => {
    const { container } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={() => {}} address='' />)
    expect(getByPlaceholderText(container, "Start typing address...")).toBeInTheDocument();
  })

  it('should set the input address to the address prop', () => {
    const { container } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={() => {}} address='fake prop'/>);
    expect(getByPlaceholderText(container, 'Start typing address...').value).toBe('fake prop');
  })

  it('should show all suggestons when queried', async () => {
    const fakeAddressHook = jest.fn();
    const { container, rerender } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={fakeAddressHook} address='' />)
    const input = getByTestId(container, 'addressInput')
    // Change the input and check the hook was called
    fireEvent.change(input, { target: { value: 'fake' } } );
    expect(fakeAddressHook).toBeCalledWith('fake');
    // re-render with the expected props now that we know we've called it correctly, this will trigger the mock function to produce fake results
    rerender(<GeolocationField setLocationHook={() => {}} setAddressHook={fakeAddressHook} address='fake'/>);
    await wait(() => {
      // Check they have all been rendered
      expect(getByText(container, 'fake place 1')).toBeInTheDocument();
      expect(getByText(container, 'fake place 2')).toBeInTheDocument();
      expect(getByText(container, 'fake place 3')).toBeInTheDocument();
    })
  })

  it('should be able to select and click on one of the options', async () => {
    // Fake geocoding function, used by getLatLng and geocodeByAddress helper functions
    window.google.maps.Geocoder = class {
      geocode(input, callback) {
        const response = {
          status: 'OK',
          results: [
            {
              formatted_address: '1 fake road, fake town, fakington',
              geometry: {
                  location: {
                    lat: jest.fn(() => 41),
                    lng: jest.fn(() => 1)
                  }
                }
            }
          ] 
        }

        callback(response.results, response.status)
      }
    }
    // Spy functions
    const fakeAddressHook = jest.fn();
    const fakeLocationHook = jest.fn();
    const { container, rerender } = render(<GeolocationField setLocationHook={fakeLocationHook} setAddressHook={fakeAddressHook} address=''/>)
    // same inputs as before, producing the results
    const input = getByTestId(container, 'addressInput');
    fireEvent.change(input, { target: { value: 'fake' } } );
    rerender(<GeolocationField setLocationHook={fakeLocationHook} setAddressHook={fakeAddressHook} address='fake'/>);

    await wait(async () => {
      // Mouse into the field we want to acitvate
      const activatableResult = getByText(container, 'fake place 3')
      fireEvent.mouseEnter(activatableResult);
      // Check the activatable result has the active style and others have inactive style
      expect(activatableResult).toHaveStyle(`background-color: #41b6e6`);
      expect(getByText(container, 'fake place 1')).toHaveStyle(`background-color: #fff`);
      expect(getByText(container, 'fake place 2')).toHaveStyle(`background-color: #fff`);
      // Click the activatable result to trigger the handleSelect method
      await wait(() => {
        fireEvent.click(activatableResult);
      })
      // Check that things were called with the correct information
      // The lat and longitude are set in the mock above
      // These will be dealt with by the parent component in-situ
      expect(fakeAddressHook).toBeCalledWith('fake place 3');
      expect(fakeLocationHook).toBeCalledWith({lat: 41, lng: 1});
    })
  })
})