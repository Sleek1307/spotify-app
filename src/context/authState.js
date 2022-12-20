import React, { useReducer } from "react";
import AuthContext from "./authContext";
import { useFunctions } from "../hook/useFunctions.hook";
import authReduce from "./authReduce";

const AuthState = (props) => {
  const initialState = {
    client_id: "",
    client_secret: "",
    redirect_uri: "",
    token: "",
    code: "",
  }

  const { AuthCall, GetTrack } = useFunctions();

  const [state, dispatch] = useReducer(authReduce, initialState);

  const getToken = async () => {

  }

  const getTrack = async () => {

  }

  const getCode = (code) => {

  }

  const getClientCredentials = (clientCredentials) => {
    console.log(clientCredentials);
    dispatch({
      type: "CLIENT_CREDENTIALS",
      payload: clientCredentials
    })
  }


  return (
    <AuthContext.Provider value={{
      client_id: state.client_id,
      client_secret: state.client_secret,
      redirect_uri: state.redirect_uri,
      token: state.token,
      code: state.code,
      getCode,
      getClientCredentials,
      getTrack,
      getToken
    }}>{props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;