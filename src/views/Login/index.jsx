import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, refreshAccessToken } from "../../redux/slices/AuthSlice";
import config from "../../config.js";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const spotifyRefreshToken = auth.spotifyRefreshToken;
  const spotifyTokenResponse = auth.spotifyTokenResponse;

  const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${config.client_id}&response_type=code&redirect_uri=${config.redirect_uri}&scope=user-top-read playlist-read-private user-read-recently-played`;
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(spotifyUri);
  };

  const authenticateUser = (code) => {
    if (spotifyRefreshToken !== "") {
      dispatch(refreshAccessToken({ spotifyRefreshToken: spotifyRefreshToken }))
    } else {
      dispatch(login({ code }));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");

    if (spotifyCode || isAuthenticated) {
      authenticateUser(spotifyCode);
    }
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="d-flex flex-column justify-content-between h-100 w-100">
      <div className="login-img h-50 w-100 border-bottom border-light"></div>
      <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-between">
        <div className="w-75 h-100 d-flex flex-column justify-content-center p-3">
          <h1 className="fw-bolder">Inicia sesión para empezar</h1>
          <div>
            <button
              type="submit"
              className="btn fw-bold rounded-pill my-2 px-4"
              onClick={handleSubmit}
            >
              Iniciar sesion
            </button>
          </div>
        </div>
        <div className="w-100 bg-dark" style={{ height: "100px" }}></div>
      </div>
    </div>
  );
};

export default Home;
