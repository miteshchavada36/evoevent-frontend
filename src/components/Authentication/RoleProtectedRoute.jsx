import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    // Redirect to the unauthorized page if the user doesn't have the right role
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // Allow access if the role is correct
};

export default RoleProtectedRoute;
