/*

A component which fetches address data TODO, and renders it using the Address Card component

*/

import React, { useEffect, useState } from 'react';
import AddressCard from './AddressCard/AddressCard'
import fetchAddressList from '../../utilities/fetchAddresses';

export const AddressList = () => {

  // Setting initial states
  const [addresses, setAddresses] = useState([]);
  const [isDBError, setisDBError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  // This will be replaced with a function
  useEffect(() => {
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
  }, [])

  // If fetch failed in useEffect
  if (isDBError) return <div><p>Error!</p></div>
  // if we haven't loaded yet
  if (!isLoaded) return <div><p>Loading addresses...</p></div>

  return (
    <>
      {
        addresses.map((data, i) => (
          <AddressCard 
            key={i} 
            name={data.name} 
            notes={data.notes} 
            location={data.location} 
          />
        ))
      }
    </>
  )
}

export default AddressList;