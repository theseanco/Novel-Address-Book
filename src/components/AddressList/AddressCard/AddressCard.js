import React, { useState, useEffect } from 'react';
import reverseGeocoding from '../../../utilities/reverseGeocode';
import PropTypes from 'prop-types';
import './AddressCard.scss';

// TODO: integrate mapping API here
// Destructuring props on input
const AddressCard = ({ name, notes, location }) => {
  // Initialise address with loading state while geocoding is completed
  const [address, setAddress] = useState('loading...');

  // function to fetch address data and assign it to state
  async function getAddressData(location) {
    const address = await reverseGeocoding({lat: location.latitude, lng: location.longitude})
    setAddress(address)
  }

  // load geolocation data on mount
  useEffect(() => {
    getAddressData(location);
  }, [location]);

  return (
    <div className="address-card">
      <h3>Name: {name}</h3>
      <hr></hr>
      <p>Notes: {notes}</p>
      <p>Address: {address}</p>
    </div>
  )
}

// Prop type checking
AddressCard.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  location: PropTypes.object
}

export default AddressCard;