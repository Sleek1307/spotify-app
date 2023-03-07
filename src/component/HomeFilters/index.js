import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveSearch } from "../../redux/slices/SearchSlice";

const Filters = () => {
  const searchWord = useSelector((state) => state.search.searchWord);
  const tokenResponse = useSelector((state) => state.auth.spotifyTokenResponse);
  const dispatch = useDispatch();

  const handleSearchClick = (e) => {
    let types = "";

    switch (e.target.id) {
      case "album":
        types = e.target.id;
        break;
      case "artist":
        types = e.target.id;
        break;
      case "playlist":
        types = e.target.id;
        break;
      case "episode":
        types = e.target.id;
        break;
      default:
        alert("El tipo de busqueda que escogiste no existe");
    }

    dispatch(saveSearch({ searchWord, types, tokenResponse }));
  };

  return (
    <div className="conatiner container-fluid d-flex justify-content-start w-100 ms-2 mt-2">
      <div className="d-flex gap-1">
        <button
          className="badge bg-light text-dark border rounded-pill p-2"
          id="album"
          onClick={handleSearchClick}
        >
          Album
        </button>
        <button
          className="badge bg-light text-dark border rounded-pill p-2"
          id="artist"
          onClick={handleSearchClick}
        >
          Artista
        </button>
        <button
          className="badge bg-light text-dark border rounded-pill p-2"
          id="playlist"
          onClick={handleSearchClick}
        >
          Playlist
        </button>
        <button
          className="badge bg-light text-dark border rounded-pill p-2"
          id="episode"
          onClick={handleSearchClick}
        >
          Episodio
        </button>
      </div>
    </div>
  );
};

export default Filters;
