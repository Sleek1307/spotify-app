import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { isAuthenticated as isAuthenticatedAtom, spotifyRefreshToken as spotifyRefreshTokenAtom, spotifyTokenResponse as spotifyTokenResponseAtom } from '../../recoil/auth/atoms'
import config from "../../config.js";
import { spotifyAuthCall } from "../../utils/index.js";

const Home = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useRecoilState(spotifyRefreshTokenAtom);
  const [spotifyTokenResponse, setSpotifyTokenResponse] = useRecoilState(spotifyTokenResponseAtom);

  const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${config.client_id}&response_type=code&redirect_uri=${config.redirect_uri}&scope=user-top-read`
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(spotifyUri);
  }

  const authenticateUser = useCallback(async (code) => {
    try {
      let result;
      if (spotifyRefreshToken != '') {
        result = await spotifyAuthCall({ refresh_token: spotifyRefreshToken, grant_type: "refresh_token" })
      } else {
        result = await spotifyAuthCall({ code, grant_type: "authorization_code" });
      }

      if (result.access_token && result.refresh_token) {
        setSpotifyRefreshToken(result?.refresh_token);
        setSpotifyTokenResponse(result);
        setIsAuthenticated(true);
        navigate('home');
      } else if (result.access_token && !result.refresh_token) {
        setSpotifyTokenResponse(result);
        navigate('home');
      } else {
        throw new Error("Usuario no fue logueado")
      }

    } catch (error) {
      alert("usuario no fue logueado")
      setSpotifyRefreshToken("");
      setSpotifyTokenResponse("");
      setIsAuthenticated(false)
    }
  }, [setIsAuthenticated, setSpotifyRefreshToken, setSpotifyTokenResponse, spotifyRefreshToken]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");

    if (spotifyCode || isAuthenticated) {
      authenticateUser(spotifyCode)
    }
  }, [location.search])

  return (
    <div className="d-flex flex-column justify-content-between h-100 w-100">
      <div className="login-img h-50 w-100 border-bottom border-light"></div>
      <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-between">
        <div className="w-75 h-100 d-flex flex-column justify-content-center p-3">
          <h1 className="fw-bolder">Inicia sesión para empezar</h1>
          <div>
            <button type="submit" className="btn fw-bold rounded-pill my-2 px-4" onClick={handleSubmit} >Iniciar sesion</button>
          </div>
        </div>
        <div className="w-100 bg-dark" style={{ height: '100px' }}>
        </div>
      </div>
    </div>
  );
}

export default Home;