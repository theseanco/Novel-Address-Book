
import GeolocationField from './GeolocationField';
import { render, getByText, getByPlaceholderText, fireEvent, getByTestId, wait } from '@testing-library/react';
import React from 'react';

/*
mocked function from reverse geocoding

    window.google.maps.Geocoder = class {
      geocode(input, callback) {
        const response = {
          status: 'FAILURE STATUS CODE',
        }

        callback(response.results, response.status)
      }
    }
*/

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
      expect(getByText(container, 'fake place 1')).toBeInTheDocument();
      expect(getByText(container, 'fake place 2')).toBeInTheDocument();
      expect(getByText(container, 'fake place 3')).toBeInTheDocument();
    })
  })

  /*
  it('should show loading text when loading prop is present', () => {
    const { container } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={() => {}} address='' />)
    expect(getByText(container, "...loading")).toBeInTheDocument();
  })

  it('should show all sugggestons when present', () => {
    const { container } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={() => {}} address='' />)
    expect(getByText(container, 'fake place 1')).toBeInTheDocument();
    expect(getByText(container, 'fake place 2')).toBeInTheDocument();
    expect(getByText(container, 'fake place 3')).toBeInTheDocument();
  })
  */

  /*
  it('should have a blue active address and white inactive addresses', () => {
    const { container } = render(<GeolocationField setLocationHook={() => {}} setAddressHook={() => {}} address='' />)
    console.log(getByText(container, 'fake place 1').style);
    // expect(getByText(container, 'fake place 1')).toHaveStyle();
    // expect(getByText(container, 'fake place 2')).toBeInTheDocument();
    expect(getByText(container, 'fake place 3')).toHaveStyle(`background-color: #41b6e6`);
  })
  */
 
  /*
  it('should send up an address and a lat/long value', () => {
    const fakeLocationHook = jest.fn();
    const fakeAddressHook = jest.fn();
    const { container } = render(<GeolocationField setLocationHook={fakeLocationHook} setAddressHook={fakeAddressHook} address='' />)
    // Click on the active item, send it up to the parent component
    fireEvent.click(getByText(container, 'fake place 3'));
    expect(fakeAddressHook).toBeCalledWith('fake place 3');
  })
  */

})