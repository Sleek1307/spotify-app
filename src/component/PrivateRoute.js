import { Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { isAuthenticated as isAuthenticatedAtom } from '../recoil/auth/atoms';

export default function PrivateRoute({ component: Component }) {
  const [isAuthenticated] = useRecoilState(isAuthenticatedAtom);

  return (isAuthenticated ? Component : <Navigate to={"/"} />)
}