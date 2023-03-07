import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import searchReducer from "../slices/SearchSlice";
import profileReducer from "../slices/ProfileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    profile: profileReducer
  },
});

export { store };
