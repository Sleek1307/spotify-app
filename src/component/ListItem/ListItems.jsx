import React from 'react';

import "./style.css";

export default function ListItems({imageUrl, id, externalUrl, onClick, releaseDate, name, artist}) {

  const handleClickRedirect = () => {
    window.open(externalUrl, "_blank")
  }

  return (
    <div className='list-item' onClick={handleClickRedirect}> 
        <img className='list-image' src={imageUrl} alt={id}/>
        <p className='list-item-title text-wrap'>{name}</p>
        <p className='list-item-artist'>{artist}</p>
        <p className="list-item-release-date">{releaseDate}</p>
    </div>
  )
}
