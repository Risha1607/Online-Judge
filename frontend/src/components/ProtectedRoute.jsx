// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  console.log("ProtectedRoute - User: ", user);
  console.log("ProtectedRoute - Required Role: ", requiredRole);

  if (!user) {
    console.log("ProtectedRoute - No user, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log("ProtectedRoute - User does not have the required role, redirecting to unauthorized");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;




