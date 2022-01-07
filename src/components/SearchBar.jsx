import React, { useState } from "react";


import  './SearchBar.css'

export default function SearchBar({onSearch}) {

  const [city, setCity] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);
      setCity('')
    }}>
      <input
        className = 'inp'
        type="text"
        placeholder="Buscar Ciudad..."
        value={city}
        onChange={e => {
          setCity(e.target.value)

          }}
      />
      <input
       className='button'
       type="submit"
       value="Agregar" />
    </form>
  );
}
