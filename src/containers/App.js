import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About.jsx';
import Ciudad from '../components/Ciudad.jsx';

import swal from "sweetalert";

const apiKey = '4ae2636d8dfbdc3044bede63951a019b';

function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };

          let ciudadEncontrada = cities.find( city=> city.id === ciudad.id )
          if(ciudadEncontrada) return swal({
             title:"esta ciudad ya se encuentra en la lista",
             text:'intente buscando una ciudad diferente',
             icon:'info',
             button: 'Aceptar'})
          
          else return swal({
            title:"Nueva ciudad agregada",
            text:"Ciudad agregada con exito!",
            icon: "success",
            button: "Aceptar"}), setCities(oldCities => [...oldCities, ciudad]);
        } else {
          swal({ title: "Ciudad no encotrada",
                 text: "Ingrese correctamente el nombre de la ciudad",
                 icon: "error",
                 button: "Aceptar"});
        }
      }); 
  }


  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }


  return (
    <div className="App">
      <Nav onSearch={onSearch}/>
      
      <Routes>
              <Route 
                path="/" 
                element={ <Cards cities={cities} onClose={onClose} /> } 
              />

              <Route 
                path="/about" 
                element=  { <About numero={4567987} />} 
              />
              <Route
                  path='/ciudad/:ciudadId'
                  element={<Ciudad onFilter={onFilter}/>}             
              />

      </Routes>
      


    </div>
  );
}

export default App;
