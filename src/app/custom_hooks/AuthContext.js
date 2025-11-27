// hooks/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getTokenFromCookie = () => {
      const match = document.cookie.match(/(^|;)\s*token=([^;]+)/);
      return match ? match[2] : null;
    };

    const token = getTokenFromCookie();

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/verify-token-get-profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
