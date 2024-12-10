import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente que provee el contexto a los componentes hijos
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa el estado token con el valor del localStorage si existe
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  // Función para iniciar sesión
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Guarda el token en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null); // Limpia el estado token
    localStorage.removeItem('token'); // Elimina el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
