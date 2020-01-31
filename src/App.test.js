import React from 'react';
import { render, getByTestId, getByText } from '@testing-library/react';
import App from './App';

describe('App Root tests', () => {

  it('Should contain a header and a footer', () => {
    const { container } = render(<App />);
    expect(getByTestId(container, 'header')).toBeInTheDocument();
    expect(getByTestId(container, 'footer')).toBeInTheDocument();
    // Check the list is loading
    expect(getByText(container, /Loading addresses/)).toBeInTheDocument();
    // Check the form has rendered
    expect(getByText(container, /Add Address/)).toBeInTheDocument();
  })
});