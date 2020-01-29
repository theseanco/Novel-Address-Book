/*

A component which fetches address data TODO, and renders it using the Address Card component

*/

import React, { useEffect, useState } from 'react';
import AddressCard from './AddressCard/AddressCard'

export const getAddresses = () => (
  [
      {
        name: "John Doe",
        notes: "friend from school",
        location: {
          latitude: 54.9863511,
          longitude: -1.5752196
        }
      },
      {
        name: "Alex NotDoe",
        notes: "Good at programming",
        location: {
          latitude: 54.9863511,
          longitude: -1.5752196
        }
      },
      {
        name: "Jane Maine",
        notes: "Probably A Lorem Ipsum Or Something",
        location: {
          latitude: 54.9863511,
          longitude: -1.5752196
        }
      }
    ]
);

export const AddressList = () => {

  const [addresses, setAddresses] = useState([]);
  // This will be replaced with a function
  useEffect(() => {
    const data = getAddresses();
    setAddresses(data);
  }, [])


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