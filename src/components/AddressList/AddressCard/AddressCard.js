/*

AddressCard component

Renders a name and notes from a database entry
Location is reverse geocoded using a helper function and displayed as an address

*/

import React, { useState, useEffect } from 'react';
import reverseGeocoding from '../../../utilities/reverseGeocode';
import PropTypes from 'prop-types';
import './AddressCard.scss';

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
    <li className="address-card">
      <div>
        <h3>Name: {name}</h3>
        <hr></hr>
        <p>Notes: {notes}</p>
        <p>Address: {address}</p>
      </div>
    </li>
  )
}

// Prop type checking
AddressCard.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  location: PropTypes.object
}

export default AddressCard;