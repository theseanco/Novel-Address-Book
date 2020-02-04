import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('header tests', () => {

  it('should return the app title in a heading', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('heading')).toHaveTextContent('Address Book App')
  })

  // Snapshot test for the header component as it does not have stateful UI logic
  it('should match snapshot', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  })
});