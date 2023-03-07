import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { spotifyProfileCall } from "../../utils";

export const getProfileData = createAsyncThunk(
  "profile/get_profile_data",
  async ({ spotifyTokenResponse }) => {
    let response;

    response = await spotifyProfileCall(spotifyTokenResponse, []);

    if (response.error) {
      console.log(response.error);
    } else {
      return response;
    }
  }
);

export const getProfilePlayLists = createAsyncThunk(
  "profile/get_profile_playlists",
  async ({ spotifyTokenResponse, endpoints }) => {
    let response;

    response = await spotifyProfileCall(spotifyTokenResponse, endpoints);

    if (response.error) {
      console.log(response);
    } else {
      return response;
    }
  }
);

export const getRecentlyPlayedTracks = createAsyncThunk(
  "profile/get_recently_played_tracks",
  async ({ spotifyTokenResponse, endpoints }) => {
    let response;
    response = await spotifyProfileCall(spotifyTokenResponse, endpoints);

    const objectsWatched = {};
    let newArray = [...response.items];

    for (let i = 0; i < newArray.length; i++) {
      const item = newArray[i].track.id;

      if (objectsWatched[item]) {
        newArray.splice(i, 1);
        i--;
      } else {
        objectsWatched[item] = true;
      }
    }

    response = newArray;

    if (response.error) {
      console.log(response);
    } else {
      return response;
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
    loading: false,
    profilePlayLists: null,
    recentlyPlayedTracks: null,
  },
  reducers: {},
  extraReducers: {
    //Datos de perfil
    [getProfileData.pending]: (state) => {
      state.loading = true;
    },
    [getProfileData.fulfilled]: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
    },
    [getProfileData.rejected]: (state) => {},
    //Tus albumes
    [getProfilePlayLists.pending]: (state) => {
      state.loading = true;
    },
    [getProfilePlayLists.fulfilled]: (state, { payload }) => {
      state.profilePlayLists = payload;
      state.loading = false;
    },
    [getProfilePlayLists.rejected]: (state) => {},
    //Pistas escuchadas recientemente
    [getRecentlyPlayedTracks.pending]: (state) => {
      state.loading = true;
    },
    [getRecentlyPlayedTracks.fulfilled]: (state, { payload }) => {

      state.recentlyPlayedTracks = payload;
      state.loading = false;
    },
    [getRecentlyPlayedTracks.rejected]: (state) => {},
  },
});

export default profileSlice.reducer;
