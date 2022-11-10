import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export interface RequireAuthProps {
  redirectTo: string;
  reverse?: boolean;
}

function RequireAuth({ redirectTo, reverse }: RequireAuthProps) {
  const isAuthenticated = useAppSelector((state: RootState) => state.AUTH.login.isAuthenticated);

  return reverse ? (
    isAuthenticated ? (
      <Navigate to={redirectTo} />
    ) : (
      <Outlet />
    )
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default RequireAuth;
