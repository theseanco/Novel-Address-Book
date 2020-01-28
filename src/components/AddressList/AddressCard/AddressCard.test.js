import React from 'react';
import { render, getByText } from '@testing-library/react';
import AddressCard from './AddressCard';

describe('AddressCard tests', () => {
  it('Should correctly render information when provided as props', () => {
    const { container } = render(
      <AddressCard 
      name={"John Doe"} 
      notes={"good at sports"} 
      location={ { latitude: 1, longitude: 60 } }/>
    );
    expect(getByText(container, /John Doe/)).toBeInTheDocument();
    expect(getByText(container, /good at sports/)).toBeInTheDocument();
    expect(getByText(container, /1/)).toBeInTheDocument();
    expect(getByText(container, /60/)).toBeInTheDocument();
  })
});