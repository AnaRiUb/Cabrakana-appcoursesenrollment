import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Componente que provee el contexto a los componentes hijos
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Función para iniciar sesión
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('authToken', token); // Almacenar token en localStorage si lo deseas
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Eliminar token del localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear el hook useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
