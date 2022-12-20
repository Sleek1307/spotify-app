import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { spotifyTokenResponse } from "../../recoil/auth/atoms";
import { spotifySearchCall } from "../../utils";
import { spotifyResult } from "../../recoil/songs/atoms";
import HomeFilters from "../../component/HomeFilters/HomeFilters";
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import Track from "../../component/Track";
import Artist from "../../component/Artist";
import Episode from "../../component/Episode";
import Playlist from "../../component/Playlist";
import Album from "../../component/Album"

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [tokenResponse] = useRecoilState(spotifyTokenResponse)
  const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult)

  const [filterType, setFilterType] = useRecoilState(filterTypeSelector);
  const resetFilter = useResetRecoilState(filterTypeSelector);

  const handleChangeTextSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();

    const types = filterType ?? 'track'
    const paramsArray = [
      {
        q: searchText,
      },
      {
        type: types,
      },
      {
        offset: 50
      }
    ];
    const response = await spotifySearchCall(paramsArray, tokenResponse.access_token);

    setSearchResponse(response)
    console.log(response);
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="content-img w-100 h-50"></div>
      <div className="w-100 h-50 d-flex flex-column align-items-center">
        <div className="content d-flex flex-column align-items-center w-75">
          <div className="d-flex fw-bolder w-100">
            <h1>Search track</h1>
          </div>
          <div className="d-flex w-100">
            <form action="" className="w-100">
              <div className="d-flex justify-content-around">
                <input
                  type="text"
                  className="form-control me-4 w-75"
                  value={searchText}
                  onChange={handleChangeTextSearch}
                />
                <button
                  type="submit"
                  className="rounded-pill fw-bolder btn w-25"
                  onClick={handleSearchClick} >
                  Buscar
                </button>
              </div>
            </form>
          </div>

          <HomeFilters />
          <button className="btn btn-light" onClick={resetFilter}>Limpiar filtros</button>

          <hr className="text-dark w-100 my-1" />
        </div>
        {searchResponse?.tracks && <div className="d-flex flex-column align-items-center content-list my-2">
          <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
            {searchResponse?.tracks && <p className="fw-bold fs-4 my-0">Canciones</p>}
            <div className="d-flex overflow-auto list-items">
              {searchResponse?.tracks?.items?.map((item, index) => {
                return (
                  <Track key={index} item={item} />
                )
              })}
            </div>
          </div>
        </div>}

        {searchResponse?.albums && <div className="d-flex flex-column align-items-center content-list my-2">
          <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
            {searchResponse?.albums && <p className="fw-bold fs-4 my-0">Album</p>}
            <div className="d-flex overflow-auto list-items">
              {searchResponse?.albums?.items?.map((item, index) => {
                return (
                  <Album key={index} item={item} />
                )
              })}
            </div>
          </div>
        </div>}

        {searchResponse?.artists && <div className="d-flex flex-column align-items-center content-list my-2">
          <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
            {searchResponse?.artists && <p className="fw-bold fs-4 my-0">Artistas</p>}
            <div className="d-flex overflow-auto list-items">
              {searchResponse?.artists?.items?.map((item, index) => {
                return (
                  <Artist key={index} item={item} />
                )
              })}
            </div>
          </div>
        </div>}

        {searchResponse?.playlists && <div className="d-flex flex-column align-items-center content-list my-2">
          <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
            {searchResponse?.playlists && <p className="fw-bold fs-4 my-0">Playlists</p>}
            <div className="d-flex overflow-auto list-items">
              {searchResponse?.playlists?.items?.map((item, index) => {
                return (
                  <Playlist key={index} item={item} />
                )
              })}
            </div>
          </div>
        </div>}

        {searchResponse?.episodes && <div className="d-flex flex-column align-items-center content-list my-2">
          <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
            {searchResponse?.episodes && <p className="fw-bold fs-4 my-0">Episodes</p>}
            <div className="d-flex overflow-auto list-items">
              {searchResponse?.episodes?.items?.map((item, index) => {
                return (
                  <Episode key={index} item={item} />
                )
              })}
            </div>
          </div>
        </div>}
      </div>
    </div >
  );
};

export default Home;