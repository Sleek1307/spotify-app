import { spotifyAuthCall } from "../../utils/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialState } from "../utils";

const initialState = getInitialState();

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh_access_token",
  async ({ spotifyRefreshToken }) => {
    let response;

    try {
      response = await spotifyAuthCall({
        refresh_token: spotifyRefreshToken,
        grant_type: "refresh_token",
      });

      localStorage.setItem(
        "spotifyTokenResponse",
        JSON.stringify(response?.access_token)
      );
      localStorage.setItem("isAuthenticated", JSON.stringify(true));

      if (response.error) {
        console.log(response);
      } else {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk("auth/login", async ({ code }) => {
  let response;
  try {
    response = await spotifyAuthCall({
      code,
      grant_type: "authorization_code",
    });

    localStorage.setItem(
      "spotifyRefreshToken",
      JSON.stringify(response?.refresh_token)
    );
    localStorage.setItem(
      "spotifyTokenResponse",
      JSON.stringify(response?.access_token)
    );
    localStorage.setItem("isAuthenticated", JSON.stringify(true));

    if (response.error) {
      console.log(response);
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
  },
  reducers: {
    logout: (state, { payload }) => {
      state.isAuthenticated = false;
      state.spotifyTokenResponse = "";
      state.spotifyRefreshToken = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.spotifyRefreshToken = payload.refresh_token;
      state.spotifyTokenResponse = payload.access_token;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [refreshAccessToken.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [refreshAccessToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.spotifyTokenResponse = payload.access_token;
      state.loading = false;
      state.isAuthenticated = true;
    },
    [refreshAccessToken.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
