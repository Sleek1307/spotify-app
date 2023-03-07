import { Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSelector } from 'react-redux';

import { isAuthenticated as isAuthenticatedAtom } from '../recoil/auth/atoms';

export default function PrivateRoute({ component: Component }) {

  const auth = useSelector(state => state.auth);

  const {isAuthenticated} = auth;

  return (isAuthenticated ? Component : <Navigate to={"/"} />)
}