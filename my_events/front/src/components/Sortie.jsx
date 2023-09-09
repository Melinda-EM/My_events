import React from 'react'
import Header from './Header'
import png from "../assets/avatar-logo.jpg";
import map from "../assets/map.jpg";


const Sortie = () => {
  return (
    <>
    <Header />
    <div>Sortie : titre de l'event</div>
    <div>
        <img src={map} alt="carte" />
        <div>
            <h1>Participants</h1>
            <img src={png} alt="image1"/>Host
            <img src={png} alt="image2"/>Guest 1
            <img src={png} alt="image3"/>Guest 2
            <img src={png} alt="image4"/>Guest 3
        </div>
        <div>
            <p>ZONE DE DISCUSSION</p>
        </div>
    </div>
    </>
  )
}

export default Sortie