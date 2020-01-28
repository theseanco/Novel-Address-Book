import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';

describe('App Root tests', () => {

  it('Should contain a header and a footer', () => {
    const { container } = render(<App />);
    expect(getByTestId(container, 'header')).toBeInTheDocument();
    expect(getByTestId(container, 'footer')).toBeInTheDocument();
  })
});