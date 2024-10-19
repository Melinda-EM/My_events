import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='relative'>
        <div className='absolute inset-0 bg-purplize opacity-70'></div>
            <div className='relative flex items-center justify-left px-4'>
                <Link to="/home" className='cursor-popcorn'>
                  <img src={require('../assets/P.png')} 
                    alt="logo du site" 
                    className='w-32'
                  />
                </Link>
                
                <div className='flex font-libre text-2xl font-bold text-dark-purple '>
                  <Link to="/chercher" className='cursor-popcorn hover:underline mx-28'>Rechercher un membre</Link>
                  <Link to="/amis" className='cursor-popcorn hover:underline mx-28'>Amis</Link>
                  <Link to="/demandes" className='cursor-popcorn hover:underline mx-28'>Demande d'ami</Link>
                  <Link to="/mes_series" className='cursor-popcorn hover:underline mx-28'>Mes séries</Link>
                </div>

            <div className='ml-auto'>
                <Link to="/profil/me" className='cursor-popcorn'>
                  <img 
                    src={require('../assets/avatar.png')}
                    alt="compte"
                    className='w-16' 
                  />
                </Link>
            </div>
        </div>    
    </div>
  )
}

export default Header