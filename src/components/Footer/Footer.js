/*

Footer component containing my name and the current year

*/

import React from 'react';

const Header = () => {

  // Get current year
  const date = new Date().getFullYear();

  return (
    <footer>
      <h5>Sean Cotterill, {date}</h5>
    </footer>
  )
}

export default Header;