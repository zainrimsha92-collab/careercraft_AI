import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session on mount
    const authData = localStorage.getItem('careercraft_auth');
    if (authData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(authData));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const mockUser = userData || { name: 'Alex Morgan', email: 'alex@example.com' };
    localStorage.setItem('careercraft_auth', JSON.stringify(mockUser));
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('careercraft_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
