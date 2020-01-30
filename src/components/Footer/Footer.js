/*

Footer component containing my name and the current year

*/

import React from 'react';

const Header = () => {

  // Get current year
  const date = new Date().getFullYear();

  return (
    <footer data-testid="footer">
      <h4>Sean Cotterill, {date}</h4>
    </footer>
  )
}

export default Header;