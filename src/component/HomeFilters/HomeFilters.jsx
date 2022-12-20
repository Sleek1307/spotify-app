import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';

import {
  album as albumAtom,
  artist as artistAtom,
  episode as episodeAtom,
  playlist as playlistAtom,
} from '../../recoil/songs/atoms';

export default function HomeFilters() {

  const [album, setAlbum] = useRecoilState(albumAtom);
  const [artist, setArtist] = useRecoilState(artistAtom);
  const [episode, setEpisode] = useRecoilState(episodeAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);

  return (
    <div className='conatiner container-fluid d-flex justify-content-center w-100 ms-2 mt-2'>
      <div className='row '>
        <div className='col-6 col-md-3 d-flex gap-1'>
          <label htmlFor="album">
            Album
          </label>
          <input type="checkbox" name="" id="album" checked={!!album} onChange={({ target }) => setAlbum(target.checked ? 'album' : null)} />
        </div>
        <div className='col-6 col-md-3 d-flex gap-1'>
          <label htmlFor="artista" >
            Artista
          </label>
          <input type="checkbox" name="" id="artista" checked={!!artist} onChange={({ target }) => setArtist(target.checked ? 'artist' : null)} />
        </div>
        <div className='col-6 col-md-3 d-flex gap-1'>
          <label htmlFor="playlist">
            Playlist
          </label>
          <input type="checkbox" name="" id="playlist" checked={!!playlist} onChange={({ target }) => setPlaylist(target.checked ? 'playlist' : null)} />
        </div>
        <div className='col-6 col-md-3 d-flex gap-1'>
          <label htmlFor="episodio">
            Episodio
          </label>
          <input type="checkbox" name="" id="episodio" checked={!!episode} onChange={({ target }) => setEpisode(target.checked ? 'episode' : null)} />
        </div>
      </div>
    </div>
  )
}
