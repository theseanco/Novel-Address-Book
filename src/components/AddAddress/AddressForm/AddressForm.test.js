import React from 'react';
import { render, getByLabelText, fireEvent, act, getByText, wait } from '@testing-library/react';
import AddressForm from './AddressForm';
import * as addAddressToDB from '../../../utilities/addAddressToDB';

jest.mock('../../../utilities/addAddressToDB');

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
        const input = getByLabelText(container, /Name/);
        fireEvent.change(input, { target: { value: 'Sean' } } );
        fireEvent.click(getByText(container, 'Submit'));
        await wait(() => {
          expect(getByText(container, /Please fill in/)).toBeInTheDocument();
        })
      });
    })
  })
});