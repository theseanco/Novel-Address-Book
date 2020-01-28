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
          latitude: 60.9618428,
          longitude: -1.4261618
        }
      },
      {
        name: "Alex NotDoe",
        notes: "Good at programming",
        location: {
          latitude: 50.9618428,
          longitude: -1.9261618
        }
      },
      {
        name: "Jane Maine",
        notes: "Probably A Lorem Ipsum Or Something",
        location: {
          latitude: 61.9618428,
          longitude: -4.4261618
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