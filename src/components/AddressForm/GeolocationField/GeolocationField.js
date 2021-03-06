/*

Geolocation form that performs a lookup for addresses using the Google Maps API

Props:
- setLocationHook: a setState hook for form state of this component, which geocoded components will be written to
- setAddressHook : a setState hook for form state to be manipulated by filled address
- address: a state value of the form this component uses


*/

import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

// Both the setAddress and address hook come from parent component
const PlaceLookup = ({setLocationHook, setAddressHook, address}) => {
  // On submission of address, write the completed address to form input
  // Pass geolocation co-ordinates to form component
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressHook(value);
    setLocationHook(latLng);
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddressHook}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <input {...getInputProps({ placeholder: "Start typing address..." })} id="address" data-testid="addressInput"/>
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
    </>
  );
}

export default PlaceLookup;