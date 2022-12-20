import React from 'react'
import ListItems from './ListItem/ListItems'

export default function Episode({ item }) {
  return (
    <ListItems
      name={item?.name}
      artist={item?.description}
      releaseDate={item?.release_date}
      imageUrl={item?.images[1]?.url || 'http://localhost:3000/assets/images/generic_avatar.jpg'}
    />
  )
}
