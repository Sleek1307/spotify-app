import { useSelector, useDispatch } from "react-redux";
import {
  getProfilePlayLists,
  getRecentlyPlayedTracks,
} from "../../redux/slices/ProfileSlice";

import Track from "../../component/Track";
import Artist from "../../component/Artist";
import Episode from "../../component/Episode";
import Playlist from "../../component/Playlist";
import Album from "../../component/Album";
import { useEffect } from "react";
import NavBar from "../../component/NavBar";

const Home = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.searchResult);
  const profilePlayLists = useSelector(
    (state) => state.profile.profilePlayLists
  );
  const recentlyPlayedTracks = useSelector(
    (state) => state.profile.recentlyPlayedTracks
  );
  const spotifyTokenResponse = useSelector(
    (state) => state.auth.spotifyTokenResponse
  );

  useEffect(() => {
    if (!searchResult) {
      dispatch(
        getProfilePlayLists({
          spotifyTokenResponse,
          endpoints: ["playlists"],
        })
      );

      dispatch(
        getRecentlyPlayedTracks({
          spotifyTokenResponse,
          endpoints: ["player", "recently-played"],
        })
      );
    }
  }, []);

  if (searchResult === null && profilePlayLists !== null) {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar />
        <div className="w-100 h-50 d-flex flex-column align-items-center">
          {profilePlayLists && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                <p className="fw-bold fs-4 my-0">Tus albums</p>
                <div className="d-flex overflow-auto list-items">
                  {profilePlayLists?.items?.map((item, index) => {
                    return <Album key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}
          {recentlyPlayedTracks && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                <p className="fw-bold fs-4 my-0">
                  Canciones escuchadas recientemente
                </p>
                <div className="d-flex overflow-auto list-items">
                  {recentlyPlayedTracks?.map((item, index) => {
                    return <Track key={index} item={item.track} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar />
        <div className="w-100 h-50 d-flex flex-column align-items-center">
          {searchResult?.tracks && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                {searchResult?.tracks && (
                  <p className="fw-bold fs-4 my-0">Canciones</p>
                )}
                <div className="d-flex overflow-auto list-items">
                  {searchResult?.tracks?.items?.map((item, index) => {
                    return <Track key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}

          {searchResult?.albums && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                {searchResult?.albums && (
                  <p className="fw-bold fs-4 my-0">Album</p>
                )}
                <div className="d-flex overflow-auto list-items">
                  {searchResult?.albums?.items?.map((item, index) => {
                    return <Album key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}

          {searchResult?.artists && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                {searchResult?.artists && (
                  <p className="fw-bold fs-4 my-0">Artistas</p>
                )}
                <div className="d-flex overflow-auto list-items">
                  {searchResult?.artists?.items?.map((item, index) => {
                    return <Artist key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}

          {searchResult?.playlists && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                {searchResult?.playlists && (
                  <p className="fw-bold fs-4 my-0">Playlists</p>
                )}
                <div className="d-flex overflow-auto list-items">
                  {searchResult?.playlists?.items?.map((item, index) => {
                    return <Playlist key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}

          {searchResult?.episodes && (
            <div className="d-flex flex-column align-items-center content-list my-2">
              <div className="w-100 d-flex flex-column bg-light py-2 px-3 rounded-3">
                {searchResult?.episodes && (
                  <p className="fw-bold fs-4 my-0">Episodes</p>
                )}
                <div className="d-flex overflow-auto list-items">
                  {searchResult?.episodes?.items?.map((item, index) => {
                    return <Episode key={index} item={item} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Home;
