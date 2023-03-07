import React from 'react';
import ListItems from './ListItem/ListItems';

export default function Album({ item }) {

  return (
    <ListItems
      imageUrl={item?.images[0]?.url || 'http://localhost:3000/assets/images/generic_avatar.jpg'}
      artist={item?.artists?.map(artist => artist?.name).join(', ')}
      name={item?.name}
      releaseDate={item?.release_date}
      externalUrl={item?.external_urls?.spotify}
      id={item?.id}
    />
  )
}
