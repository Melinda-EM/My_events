import React from 'react'
import '../index.css'

const Menu = () => {
  return (
    <div className='menu-box'>
        <h2>Filtres</h2>
        <input type="text" id="search" placeholder="Entrer un lieu/ville"/>
        <select name="categories" id="categorie">
            <option value="">Catégories</option>
            <option value="concert">Concert</option>
            <option value="gratuit">Gratuit</option>
            <option value="sport">Sport</option>
            <option value="cinema">Cinéma</option>
            <option value="enfants">Enfants</option>
            <option value="art">Art</option>
            <option value="conference">Conférence</option>
            <option value="rencontre">Rencontre</option>
            <option value="animation">Animation</option>
            <option value="jeux">Jeux</option>
        </select>
    </div>
  )
}

export default Menu