import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('header tests', () => {

  it('should return default header data', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('heading')).toHaveTextContent('Address Book App')
  })
});