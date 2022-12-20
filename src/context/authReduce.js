export default (state, action) => {
  console.log(action.payload);

  const { payload, type } = action;

  switch (type) {
    case "CLIENT_CREDENTIALS":
      return {
        ...state,
        client_id: payload._clientId,
        client_secret: payload._clientSecret,
        redirect_uri: payload._redirectUri,
      }
    default:
      return state;
  }
}