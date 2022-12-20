import React, { useContext } from "react";

const Track = () => {
  const value = JSON.parse(localStorage?.track);
  const runArray = (items) => {
    let a = "";
    items.map((item, index) => {
      a += index == items.length - 1 ? item.name + "." : item.name + ", ";
    });
    return a;
  };

  console.log(value);
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <div className="w-50">
          <div className="d-flex">
            <div className="w-50">
              <img
                src={value.album.images[1].url}
                alt=""
                srcset=""
                width={300}
              />
            </div>

            <div className="d-flex align-items-start w-50 fs-4">
              <p className="fw-bolder">
                Nombre: <span className="fw-light">{value.name}</span>
                <br/>
                Album: <span className="fw-light">{value.album.name}</span>
                <br />
                Fecha: <span className="fw-light">{value.album.release_date}</span>
                <br />
                Album: <span className="fw-light">{runArray(value.album.artists)}</span>
              </p>
            </div>
          </div>

          <hr />
        </div>
      </div>
    </>
  );
};

export default Track;
