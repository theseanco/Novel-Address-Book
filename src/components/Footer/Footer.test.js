import React from 'react';
import { render, getByText } from '@testing-library/react';
import Footer from './Footer';

describe('footer tests', () => {
  // Mock date function
  global.Date.getFullYear = jest.fn(() => 2020);

  // Using regex to match parts of text rather than complete text
  it('should return my name and the date', () => {
    const { container } = render(<Footer />);
    expect(getByText(container, /Sean Cotterill/)).toBeInTheDocument()
    expect(getByText(container, /2020/)).toBeInTheDocument()
  })
});