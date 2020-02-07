// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// Mock Google Maps API, taken from https://github.com/hibiken/react-places-autocomplete/issues/189
window.google = {
  maps:{
      Marker:class{},
      Map:class{ setTilt(){} fitBounds(){}},
      LatLngBounds:class{},
      places:{
          Autocomplete: class {},
          AutocompleteService:class{
            getPlacePredictions(input, callback) {
              callback([
                  {
                    description: 'fake place 1',
                    id: 1,
                    place_id: 123,
                    structured_formatting: {
                      main_text: 'fake main text',
                      secondary_text: 'fake secondary text'
                    },
                    terms: [],
                    types: []
                  },
                  {
                    description: 'fake place 2',
                    id: 2,
                    place_id: 123,
                    structured_formatting: {
                      main_text: 'fake main text',
                      secondary_text: 'fake secondary text'
                    },
                    terms: [],
                    types: []
                  },
                  {
                    description: 'fake place 3',
                    id: 3,
                    place_id: 123,
                    structured_formatting: {
                      main_text: 'fake main text',
                      secondary_text: 'fake secondary text'
                    },
                    terms: [],
                    types: []
                  },
                  
                ], 'OK')
                /*
              return (
                [
                  {
                    active: false,
                    description: 'fake place 1',
                    id: 1
                  },
                  {
                    active: false,
                    description: 'fake place 2',
                    id: 2
                  },
                  {
                    active: true,
                    description: 'fake place 3',
                    id: 3
                  },
                ]
              )
              */
            }
          },
          PlacesServiceStatus: {
              INVALID_REQUEST: 'INVALID_REQUEST',
              NOT_FOUND: 'NOT_FOUND',
              OK: 'OK',
              OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
              REQUEST_DENIED: 'REQUEST_DENIED',
              UNKNOWN_ERROR: 'UNKNOWN_ERROR',
              ZERO_RESULTS: 'ZERO_RESULTS',
          },
          PlacesAutocomplete:{
              INVALID_REQUEST: 'INVALID_REQUEST',
              NOT_FOUND: 'NOT_FOUND',
              OK: 'OK',
              OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
              REQUEST_DENIED: 'REQUEST_DENIED',
              UNKNOWN_ERROR: 'UNKNOWN_ERROR',
              ZERO_RESULTS: 'ZERO_RESULTS',
          }
      },

      MarkerClusterer:class{},
      Geocoder:class{
          geocode() {}
      },
  }
};