import React from 'react'
import ListItems from './ListItem/ListItems'

export default function Playlist({ item }) {
  return (
    <ListItems
      name={item?.name}
      imageUrl={item?.images[1]?.url || 'http://localhost:3000/assets/images/generic_avatar.jpg'}
      artist={item?.description}
      id={item?.id}
      externalUrl={item?.external_urls?.spotify}
    />
  )
}
