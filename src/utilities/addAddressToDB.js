import axios from 'axios';

const postToDB = async (name, notes, location) => {
  // Match data schema to google data schame
  const processedLocation = {
    latitude: location.lat,
    longitude: location.lng
  };
  try {
   const post = await axios.post('https://novel-address-book-backend.herokuapp.com/addresses', {
      name,
      notes,
      location: processedLocation
    })
    return post;
  } catch (error) {
    throw error;
  }
}

export default postToDB;