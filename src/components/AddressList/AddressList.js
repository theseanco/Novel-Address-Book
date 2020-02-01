/*

A component which fetches address data, and renders it using the addressCard component

Will perform a fetch of the database on render, and when the fetching prop changes to `true`

Props:
- fetching: a state passed into the component, if it is true or changes to true a database fetch will be performed
- setFetching: a setState hook used to set the `fetching` state to false once fetch is complete

*/

import React, { useEffect, useState } from 'react';
import AddressCard from './AddressCard/AddressCard'
import fetchAddressList from '../../utilities/fetchAddresses';
import './AddressList.scss';

export const AddressList = ({ setFetching, fetching }) => {

  // Setting initial states
  const [addresses, setAddresses] = useState([]);
  const [isDBError, setisDBError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  // This will be replaced with a function
  useEffect(() => {
    if (fetching) {
      // Wrapper function around axois fetchAddresses, linking it up with local state.
      const writeAddressesToState = async () => {
        try {
          const result = await fetchAddressList();
          // Set that we have addresses, as well as loaded condition
          setIsLoaded(true);
          setAddresses(result);
        } catch (error) {
          setisDBError(true);
        }
      }
      writeAddressesToState();
      // Set fetching to false to prevent re-fetching
      setFetching(false);
    }
  }, [fetching, setFetching])

  // If fetch failed in useEffect
  if (isDBError) return <div className="list-error-text"><p>Error fetching addresses!</p></div>
  // if we haven't loaded yet
  if (!isLoaded) return <div className="list-loading-text"><p>Loading addresses...</p></div>

  return (
    <div className="address-list">
      {
        // Map uses data.id for key as it will be unique
        addresses.map((data) => (
          <AddressCard 
            key={data.id} 
            name={data.name} 
            notes={data.notes} 
            location={data.location} 
          />
        ))
      }
    </div>
  )
}

export default AddressList;