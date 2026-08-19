import React, {
  createContext,
  useState,
  useEffect
} from "react";

import { jwtDecode }
from "jwt-decode";

export const AuthContext =
  createContext();

function AuthProvider({
  children
}) {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [role, setRole] =
    useState("");

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {
      try {

        const decoded =
          jwtDecode(token);

        setIsLoggedIn(true);
        setRole(
          decoded.role || ""
        );

      } catch {

        localStorage.removeItem(
          "token"
        );

        setIsLoggedIn(false);
        setRole("");
      }
    }

  }, []);

  const login = (token) => {

    localStorage.setItem(
      "token",
      token
    );

    const decoded =
      jwtDecode(token);

    setIsLoggedIn(true);
    setRole(
      decoded.role || ""
    );
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;