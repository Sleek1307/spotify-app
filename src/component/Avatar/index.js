import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../redux/slices/ProfileSlice";
import { logout } from "../../redux/slices/AuthSlice";

import { Popover, OverlayTrigger } from "react-bootstrap";
import "../../component/Avatar/avatar.css";

const Avatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonRotated, setButtonRotated] = useState(false);
  const profileState = useSelector((state) => state.profile);
  const tokenResponse = useSelector((state) => state.auth.spotifyTokenResponse);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileData = profileState.profileData;

  useEffect(() => {
    dispatch(getProfileData({ spotifyTokenResponse: tokenResponse }));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (profileData.error !== null) {
      navigate("/error")
    }
  }, [profileData])

  if (profileData.data !== null) {
    return (
      <OverlayTrigger
        key={"bottom"}
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom">
            <Popover.Body className="p-2">
              <div className="avatar-list">
                <span className="avatar--list-item fw-semibold">
                  <a
                    href={
                      profileData?.external_urls?.spotify
                        ? profileData?.external_urls?.spotify
                        : "#"
                    }
                  >
                    Tu cuenta
                  </a>
                </span>
                <span
                  className="avatar--list-item fw-semibold"
                  onClick={() => {
                    localStorage.clear();
                    dispatch(logout());
                  }}
                >
                  Cerrar sesión
                </span>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button
          className="border avatar"
          onClick={() => {
            setButtonRotated(!buttonRotated);
          }}
        >
          <img
            src={profileData.data?.images[0]?.url}
            alt="Imagen de John Doe"
            className="avatar-img"
          />
          <p className="m-0 fw-bold">{profileData.data?.display_name}</p>
          <i
            className={
              "bi bi-chevron-down px-2 avatar-icon" +
              (buttonRotated ? " avatar-icon__rotated" : "")
            }
          ></i>
        </button>
      </OverlayTrigger>
    );
  } else {
    return (
      <div className="border avatar px-2 py-1 d-flex align-items-center">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p className="m-0 ms-2">Cargando datos</p>
      </div>
    );
  }
};

export default Avatar;
