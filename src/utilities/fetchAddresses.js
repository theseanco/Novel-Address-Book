/*

Function to fetch array of addresses from the database, takes no arguments and returns an array.

*/

import axios from "axios";

// Use axios to fetch data from db
// Keeping this separate from component logic makes it more reusable and easier to test in isolation
const fetchAddressList = async () => {
  try {
    // return data from axios request if we can get it
    const { data } = await axios.get('https://novel-address-book-backend.herokuapp.com/addresses');
    return data;
  } catch (error) {
    // throw error back to calling component
    throw error;
  }
}

export default fetchAddressList;