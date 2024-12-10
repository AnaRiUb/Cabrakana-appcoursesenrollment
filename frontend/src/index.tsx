import App from './App';
import { AuthProvider } from './context/AuthContext';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Forms/LoginState';


const clientId = '462617646895-lj8nfm7e4vs8s18setd6oj8g5oj8qr4v.apps.googleusercontent.com';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No se encontró el elemento root');
}

const root = createRoot(container);


export const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId} {...(children && { children }) as any}>
      {children}
    </GoogleOAuthProvider>
  );
};

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {

    const checkAuth = async () => {
      setIsAuthenticated(true); 
    };
    checkAuth();
  }, []);

  return (
    <React.StrictMode>
      <AuthProvider>
        <AppProvider>
          {isAuthenticated ? <App /> : <Login />}
        </AppProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

root.render(<AppWrapper />);