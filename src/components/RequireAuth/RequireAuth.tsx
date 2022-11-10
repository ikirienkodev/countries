import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
export interface RequireAuthProps {
  redirectTo: string;
  reverse?: boolean;
}

const RequireAuth = ({ redirectTo, reverse }: RequireAuthProps) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.AUTH.login.isAuthenticated);

  if (reverse) {
    return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  }
};

export default RequireAuth;
