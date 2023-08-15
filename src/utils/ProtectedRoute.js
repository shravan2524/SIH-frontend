import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../bloc/auth";

function ProtectedRoute({ role = "User", redirectPath = "/", children }) {
  const navigate = useNavigate();
  useEffect(() => {
    verify().then((val) => {
      if (val?.role !== role) navigate("/login");
    });
  }, []);
  return children;
}

export default ProtectedRoute;
