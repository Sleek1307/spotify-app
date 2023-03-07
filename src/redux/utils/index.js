const stateItems = [
  "isAuthenticated",
  "spotifyRefreshToken",
  "spotifyTokenResponse",
];

const getInitialState = () => {
  let initialState = {};
  for (let i = 0; i < stateItems.length; i++) {
    const item = localStorage.getItem(stateItems[i]);

    if (item !== "undefined" && item !== null) {
      initialState = {
        ...initialState,
        [stateItems[i]]: JSON.parse(item),
      };
    }
  }

  initialState = {
    spotifyRefreshToken: "",
    spotifyTokenResponse: "",
    ...initialState,
    isAuthenticated:
      initialState.isAuthenticated === undefined || null
        ? false
        : initialState.isAuthenticated,
  };

  return { ...initialState, loading: false, error: "" };
};

export { getInitialState };
