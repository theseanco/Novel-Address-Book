import React  from 'react';
import { render, 
  getByLabelText, 
  fireEvent, 
  act, 
  getByText, 
  wait, 
  getByDisplayValue, 
  queryByDisplayValue } from '@testing-library/react';
import AddressForm from './AddressForm';
import * as addAddressToDB from '../../utilities/addAddressToDB';

jest.mock('../../utilities/addAddressToDB');

// Make a mock of the geolocation field component to test that it modifies state correctly
jest.mock('./GeolocationField/GeolocationField', () => {
  const ComponentToMock = ({ setLocationHook, setAddressHook, address }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      setLocationHook({ lat: 60, lng: 1 });
      setAddressHook("1 London Way, London");
    }
    return (
      <>
        <input id="address" value={address} readOnly/>
        <button onClick={handleSubmit}>Mock Autocomplete</button>
      </>
    )
  };
  return ComponentToMock;
});

// const GeolocationField = require('./ComponentToTest').default;

describe('AddressForm tests', () => {
  it('Should render the correct form fields for name, notes and location', () => {
    const { container } = render(<AddressForm />);
    expect(getByLabelText(container, /Name/)).toBeInTheDocument();
    expect(getByLabelText(container, /Notes/)).toBeInTheDocument();
    expect(getByLabelText(container, /Address/)).toBeInTheDocument();
  })


  describe('Test form inputs', () => {
    // const { container } = render(<AddressForm />)
    // Simulate form inputs
    it('Name should take an input', () => {
      const { container } = render(<AddressForm />)
      const input = getByLabelText(container, /Name/);
      fireEvent.change(input, { target: { value: 'Sean' } } );
      expect(input.value).toBe('Sean');
    })

    it('Notes should take an input', () => {
      const { container } = render(<AddressForm />)
      const input = getByLabelText(container, /Notes/);
      fireEvent.change(input, { target: { value: 'Some notes about Sean' } } );
      expect(input.value).toBe('Some notes about Sean');
    })

    it('should show an error when the form is not filled', async () => {
      addAddressToDB.default = jest.fn(() => []) 
      await act(async() => {
        const { container } = render(<AddressForm />)
        fireEvent.click(getByText(container, 'Submit'));
        await wait(() => {
          expect(getByText(container, /Please fill in/)).toBeInTheDocument();
        })
      });
    })

    // Here, the mocked 'button' takes the place of clicking the autoselect in lieu of a more detailed mock
    // This is testing whether the GeolocationField component will be able to change the parent state correctly
    it('GeolocationField comopnent changes the parent state', async () => {
      addAddressToDB.default = jest.fn(() => []) 
      await act(async() => {
        const { container } = render(<AddressForm />)
        fireEvent.click(getByText(container, 'Mock Autocomplete'));
        await wait(() => {
          expect(getByDisplayValue(container, /1 London Way/)).toBeInTheDocument();
        })
      });
    })

    // A comprehensive test of the component
    // Checks filling fields, clearing fields and submission
    it('Once all fields are filled, form can be submitted', async () => {
      addAddressToDB.default = jest.fn(() => []) 
        const { container } = render(<AddressForm />)
        // Create fake name
        const nameInput = getByLabelText(container, /Name/);
        fireEvent.change(nameInput, { target: { value: 'Fake Name' } } );
        // Create fake optional notes
        const notesInput = getByLabelText(container, /Notes/);
        fireEvent.change(notesInput, { target: { value: 'Fake Notes' } } );
        // Create fake address
        fireEvent.click(getByText(container, 'Mock Autocomplete'));
        // Cick the submit button
        fireEvent.click(getByText(container, 'Submit'));
        // Once clicked, the fields should be purged of text
        // Need to use queryBy rather than getBy to assert on absence of elements
        await wait(() => {
          expect(queryByDisplayValue(container, /1 London Way/)).not.toBeInTheDocument();
          expect(queryByDisplayValue(container, /Fake Name/)).not.toBeInTheDocument();
          expect(queryByDisplayValue(container, /Fake Notes/)).not.toBeInTheDocument();
        });
        // Check it has been called once with the right arguments
        expect(addAddressToDB.default).toHaveBeenCalledTimes(1);
        expect(addAddressToDB.default).toHaveBeenCalledWith(
          'Fake Name',
          'Fake Notes',
          {
            lat: 60,
            lng: 1
          }
        )
    })
  })
});