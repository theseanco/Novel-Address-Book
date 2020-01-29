import React from 'react';
import { render, getByLabelText } from '@testing-library/react';
import AddressForm from './AddressForm';

describe('AddressForm tests', () => {
  it('Should render the correct form fields for name, notes and location', () => {
    const { container } = render(<AddressForm />);
    expect(getByLabelText(container, /Name/)).toBeInTheDocument();
    expect(getByLabelText(container, /Notes/)).toBeInTheDocument();
    expect(getByLabelText(container, /Location/)).toBeInTheDocument();
  })
});