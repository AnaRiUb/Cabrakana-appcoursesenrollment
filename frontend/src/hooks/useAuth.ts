import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (credentials: { email: string; password: string }) => {
    try {

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Error al iniciar sesión');

      const data = await response.json();
      setIsAuthenticated(true);

      
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, login, logout, loading };
};

export default useAuth;
