import React from 'react';
import './Card.css';

import { Link } from 'react-router-dom';

import swal from 'sweetalert'

export default function Card ({min, max, name, img, onClose, id}) {
    return (
          
      <div className="card">
        <div id="closeIcon" className="row">

            <button onClick={() => swal({
            title: 'Eliminar',
            text: 'Estas seguro que deseas eliminar este arhivo?',
            icon: 'warning',
            buttons: ['NO', 'SI']
            }).then(res=>{
              if(res){
                 onClose(swal({title: 'El archivo se a eliminado correctamente', icon: "success"}))
              }
            })} className="btn btn-sm btn-danger">X</button>
        </div>
        
        <Link to={`/ciudad/${id}`} style={ {'textDecoration':'none', 'color':'black'  } } > 
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p>Min</p>
                <p>{min}°</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p>Max</p>
                <p>{max}°</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+img+"@2x.png"} width="80" height="80" alt="" />
              </div>
            </div>
          </div>
        </Link>

      </div>
    );
};
