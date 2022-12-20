import React, { useEffect, useState } from "react";
import config from "../config";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(`https://accounts.spotify.com/authorize?client_id=${config.client_id}&response_type=code&redirect_uri=${config.redirect_uri}&scope=user-top-read`);
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-between h-100 w-100">
        <div className="login-img h-50 border-bottom border-light"></div>
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
    </>
  );
};

export default Login;
