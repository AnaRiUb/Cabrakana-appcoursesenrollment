import React, { PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '462617646895-lj8nfm7e4vs8s18setd6oj8g5oj8qr4v.apps.googleusercontent.com';

// Selecciona el contenedor raíz
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

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
