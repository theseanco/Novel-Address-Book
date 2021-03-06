/*

Root app component that renders the page
Contains some stateful logic for controlling database fetching described below

*/



import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddressList from './components/AddressList/AddressList';
import AddressForm from './components/AddressForm/AddressForm';
import './App.scss'

function App() {
  // State for the app that is used to set whether fetching should be performed or not, a boolean
  // This could be done using Redux, which would make the relationship between components less heirarchical
  // But in this case, for a small prototype with everything else being handled by local state Redux is (arguably) overkill
  // This could also use the context API, but again that's probably overkill for a boolean value.
  // When an item is successfully posted to the database, this will be set to `true` by AddressForm
  // This will trigger a refetch and rerender in AddressList, which will then set it to false. 
  const [fetching, setFetching] = useState(true);

  return (
    <>
      <Header />
      <main>
        <AddressList fetching={fetching} setFetching={setFetching} />
        <hr />
        <AddressForm setFetching={setFetching} />
      </main>
      <Footer />
    </>
  );
}

export default App;
