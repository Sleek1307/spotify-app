import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component }) {
  const auth = useSelector((state) => state.auth);

  const { isAuthenticated } = auth;

  return isAuthenticated ? Component : <Navigate to={"/"} />;
}
