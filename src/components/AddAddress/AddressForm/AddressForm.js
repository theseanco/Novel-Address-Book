import React, { useState } from "react";

const AddressForm = (props) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Submitting Name ${name}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddressForm