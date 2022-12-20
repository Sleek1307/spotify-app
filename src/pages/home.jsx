import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFunctions } from "../hook/useFunctions.hook";
import { useAuth } from "../hook/useContext";
import config from "../config";

const Home = () => {
  const navigate = useNavigate();
  const clientData = useAuth();
  const [code, setCode] = useState();
  const [track, setTrack] = useState("")
  const [queryData, setQueryData] = useState([]);
  const functions = useFunctions();

  const runArray = (items) => {
    let a = "";
    items.map((item, index) => {
      a += index == items.length - 1 ? item.name + "." : item.name + ", ";
    });
    return a;
  };

  const handleChange = (e) => {
    e.preventDefault()
    setTrack(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token')).access_token
    console.log(token);
    const response = await functions.GetTrack(track, token);
    console.log(response);
    // setQueryData(response.tracks.items);
  };

  const handleMore = (e) => {
    if (localStorage.getItem("track") !== undefined) {
      let v = queryData[e.target.value]
      console.log(v);
      localStorage.setItem('track', JSON.stringify(queryData[e.target.value]))
    } else {
      localStorage.removeItem('track')
    }
  }

  const goLogin = () => {
    navigate('/');
  }

  useEffect(() => {
    if (code === undefined) {
      let urlCode = new URL(window.location).searchParams.get('code');
      setCode(urlCode)
    }
  }, [])

  //usuario:ICFES222245797255
  //contraseña:FZhCAX

  useEffect(async () => {
    console.log(code);
    if (code !== undefined && localStorage.getItem('token') === undefined) {
      console.log(code);
      let token = await functions.AuthCall({
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uri: config.redirect_uri
      }, code)

      console.log(token);

      if (token?.error_description === 'Invalid authorization code' || token?.error_description === 'Authorization code expired') {
        goLogin();
      } else {
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
      }
    }
  }, [code])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="content-img w-100" style={{ height: "50%" }}></div>
        <div className="w-100" style={{ height: "50%" }}>
          <div
            className="content d-flex flex-column align-items-center px-3 mt-4"
            style={{ width: "100%" }}
          >
            <div className="d-flex" style={{ width: "100%" }}>
              <h1>Search track</h1>
            </div>

            <div className="d-flex" style={{ width: "100%" }}>
              <form action="" className="w-100">
                <div className="d-flex justify-content-around">
                  <input
                    type="text"
                    className="form-control me-4 w-75"
                    value={track}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="rounded-pill fw-bolder btn-light btn w-25"
                    onClick={handleClick} >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="d-flex flex-column align-items-center overflow-auto content-list px-3 pb-3"
            style={{ minHeight: "70%" }}
          >
            <div className="w-100">
              <hr className="text-dark w-100" />
            </div>
            <div className="card-container row d-flex justify-content-around w-100">
              {queryData.map((item, index) => {
                return (
                  <div
                    className=" card col-6 col-sm-6 col-md-6 col-lg-4 mx-2 my-2"
                    style={{ width: "300px" }}
                    key={index}
                  >
                    <img
                      src={item.album.images[1].url}
                      className="card-img-top h-50 w-auto mt-1"
                      alt="..."
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title overflow-hidden">
                          {item.name.length > 20
                            ? item.name.split("")
                            : item.name}
                        </h5>
                        <p
                          className="card-text fw-bold overflow-hidden "
                          style={{ width: "28ch" }}
                        >
                          Album:
                          {
                            <span className="fw-lighter">
                              {" " + item.album.name}
                            </span>
                          }
                          <br />
                          Cantantes:{" "}
                          {
                            <span className="fw-lighter">
                              {runArray(item.artists)}
                            </span>
                          }
                        </p>
                      </div>
                      <button
                        className="text-dark fw-bold btn btn-primary rounded-pill"
                        value={index}
                        onClick={handleMore}
                      >
                        ver mas
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Home;
