import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContextValue } from "./useContextValue";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const { loggedUser } = useContextValue();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedUser) setIsLoggedIn(true);
    else navigate("/auth/login");
  }, [loggedUser, navigate]);

  if (isLoggedIn) return <Outlet />;
};

export default ProtectedRoute;
