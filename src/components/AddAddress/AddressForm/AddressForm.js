import React, { useState } from "react";
import GeolocationForm from './GeolocationField/GeolocationField';
import addAddressToDB from '../../../utilities/addAddressToDB';
import './AddressForm.scss';

const AddressForm = ({ setFetching }) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  // Components derived from gecoding component
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  // Address passed to geocoding component, allowing for reset on submit
  const [address, setAddress] = useState('');
  // See if there is an error submitting
  const [errorType, setErrorType] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      // add the available data to the database
      // If there is no name and no co-ords, prevent submission to backend
      if (
        name === '' ||
        coordinates.lat === null ||
        coordinates.lng === null
      ) {
        setErrorType('form');
        return;
      }

      // if validation successful, try to submit to backend, if not then reject
      try {
        await addAddressToDB(name, notes, coordinates);
        // reset state
        setName('');
        setNotes('');
        setCoordinates({
          lat: null,
          lng: null
        });
        setAddress('');
        // Set form error to false in the case of a repeat submission
        setErrorType('');
        // Set app fetching to true, to trigger a re-render of addresslist component
        setFetching(true);
      } catch (error) {
        setErrorType('connection');
      }
  }

  return (
    <div className="address-form">
      <form onSubmit={handleSubmit}>
        <legend>Add Address:</legend>
        <hr />
        {
          errorType === 'connection' ? <p>Error submitting form, please try again</p> : null
        }
        {
          errorType === 'form' ? <p>Please fill in all details</p> : null
        }
        <label htmlFor="name" >Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="notes">Notes (optional)</label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <GeolocationForm setLocationHook={setCoordinates} setAddressHook={setAddress} address={address}/>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddressForm