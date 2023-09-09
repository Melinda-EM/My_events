import React from 'react'
import Header from './Header'
import { Link } from "react-router-dom";
import avatar from '../assets/avatar-logo.jpg'

//vue par les utilisateurs lambdas

const Profil = () => {
  return (
    <>
    <Header />
    <div>Profil</div>
    <div className='profil'>
      <img src={avatar} alt="avatar"/>
      <h1>Pseudonyme</h1>
      <h2>Présentation</h2>
      <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem porro temporibus at provident aut eveniet necessitatibus soluta et, ipsa sint nam, totam optio dolorem eum quia voluptates quas unde. Aut?</p>
    </div>
    <div>
      <h1>Liste des sorties</h1>
      <Link to="./sortie">
      Sortie
      </Link>
      <p>Sortie + image + nombre de participants</p>
    </div>
    </>
  )
}

export default Profil