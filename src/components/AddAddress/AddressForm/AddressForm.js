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
        {
          errorType === 'connection' ? <p>Error submitting form...</p> : null
        }
        {
          errorType === 'form' ? <p>Please fill in all details</p> : null
        }
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Notes (optional):
          <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </label>
        <label>
          Address:
          <GeolocationForm setLocationHook={setCoordinates} setAddressHook={setAddress} address={address}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddressForm