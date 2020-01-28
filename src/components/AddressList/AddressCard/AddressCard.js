import React from 'react';
import PropTypes from 'prop-types';

// TODO: integrate mapping API here
// Destructuring props on input
const AddressCard = ({ name, notes, location }) => (
  <div>
    <h3>{name}</h3>
    <p>{notes}</p>
    <p>{location.latitude}</p>
    <p>{location.longitude}</p>
  </div>
)

// Prop type checking
AddressCard.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  location: PropTypes.object
}

export default AddressCard;