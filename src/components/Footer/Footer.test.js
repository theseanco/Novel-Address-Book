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

  // Snapshot test for the footer component as it does not have stateful UI logic
  it('should match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  })
});