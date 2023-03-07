import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spotifySearchCall } from "../../utils";

export const saveSearch = createAsyncThunk(
  "search/save_search",
  async ({ searchWord, types, tokenResponse }) => {
    let response;
    const paramsArray = [
      {
        q: searchWord,
      },
      {
        type: types,
      },
      {
        offset: 50,
      },
    ];

    try {
      response = await spotifySearchCall(paramsArray, tokenResponse);

      return response;
    } catch (error) {
      return error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResult: null,
    searchWord: "",
    error: "",
    loading: false,
  },
  reducers: {
    setSearchWord: (state, { payload }) => {
      state.searchWord = payload.searchWord;
    },
  },
  extraReducers: {
    [saveSearch.pending]: (state) => {
      state.loading = true;
    },
    [saveSearch.fulfilled]: (state, { payload }) => {
      state.searchResult = payload;
    },
    [saveSearch.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { setSearchWord } = searchSlice.actions;

export default searchSlice.reducer;
