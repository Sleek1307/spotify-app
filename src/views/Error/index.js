import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/AuthSlice";

const Error = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/')
  }

  return (
    <div className="w-100 d-flex mt-5 justify-content-center">
      <div class="card w-75">
        <h5 class="card-header">Error</h5>
        <div class="card-body">
          <h5 class="card-title">Algo ha ido mal</h5>
          <p class="card-text">
            Lo sentimos pero ha habido un problema, intentalo mas tarde.
          </p>
          <button href="#" class="btn btn-primary" onClick={handleClick}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
