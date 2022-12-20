import React from 'react'

import ListItems from './ListItem/ListItems'


export default function Artist({ item }) {
  return (
    <ListItems
      imageUrl={item?.images[1]?.url || 'http://localhost:3000/assets/images/generic_avatar.jpg'}
      artist={item?.artists?.map(artist => artist.name).join(', ') || ''}
      name={item?.name}
      releaseDate={""}
      externalUrl={item?.external_urls?.spotify}
      id={item?.id}
    />
  )
}
