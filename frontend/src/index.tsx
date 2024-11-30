import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Importa el proveedor
import { AuthProvider } from './context/AuthContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
 /* <GoogleOAuthProvider clientId="462617646895-lj8nfm7e4vs8s18setd6oj8g5oj8qr4v.apps.googleusercontent.com"> {}
 */   <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
 /* </GoogleOAuthProvider>*/
);
