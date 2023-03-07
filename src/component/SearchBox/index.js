import { useSelector, useDispatch } from "react-redux";
import { setSearchWord, saveSearch } from "../../redux/slices/SearchSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search);
  const tokenResponse = useSelector((state) => state.auth.spotifyTokenResponse);
  const searchWord = search.searchWord;

  const handleChangeTextSearch = (e) => {
    dispatch(setSearchWord({ searchWord: e.target.value }));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    dispatch(saveSearch({ searchWord, types: "track,artist,album", tokenResponse }));
  };

  return (
    <form class="d-flex" role="search">
      <div className="form-group">
        <div className="form-icon--container">
          <i class="bi bi-search form-icon--element"></i>
        </div>
        <input
          class="form-control me-2 rounded-pill"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchWord}
          onChange={handleChangeTextSearch}
        />
      </div>
      <button
        class="rounded-pill fw-bolder btn w-25 mx-2"
        type="submit"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
