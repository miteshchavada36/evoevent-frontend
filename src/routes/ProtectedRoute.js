import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath, auth }) => {
  document.body.classList.remove('login');
  if (!auth) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
  // return <Navigate to={'dashboard'} />;
};

export default ProtectedRoute;