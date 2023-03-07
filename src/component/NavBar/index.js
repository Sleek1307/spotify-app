import Avatar from "../Avatar";
import SearchBox from "../SearchBox";
import Filters from "../HomeFilters";

import { useSelector } from "react-redux";
import { selector } from "recoil";

const NavBar = () => {
  const searchState =  useSelector((state) => state.search)
  const searchResult = searchState.searchResult;
  const searchWord = searchState.searchWord;

  return (
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <SearchBox />
        <Avatar />
      </div>
      {searchResult && searchWord !== '' ? <Filters /> : null}
    </nav>
  );
};

export default NavBar;
