/*

Geolocation form that performs a lookup for addresses using the Google Maps API

Props:
- setLocationHook: a setState hook for form state of this component, which geocoded components will be written to

TODO: testing render props

*/

import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const PlaceLookup = ({ setLocationHook }) => {
  const [address, setAddress] = useState('')

  // On submission of address, write the completed address to form input
  // Pass geolocation co-ordinates to form component
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setLocationHook(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <input {...getInputProps({ placeholder: "Type address" })} />
            <ul>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <li {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default PlaceLookup;