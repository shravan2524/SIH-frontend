import React, { createContext, useState, useEffect } from "react";
import { verify } from "../bloc/auth";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    verify()
      .then((val) => {
        if (val) {
          setUser(val);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => setIsLoggedIn(false))
      .finally(setIsLoading(false));
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}
