import React from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../api/userAuth";

export default function UserProtectedRoute({ children }) {
  if (!userAuth.isLogged()) return <Navigate to="/login" />;
  return children;
}
