import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleLoginSuccess = (response: any) => {
    const token = response.credential;
    if (token) {
      loginWithGoogle(token);
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Error al iniciar sesión con Google:', error);
  };

  const loginWithGoogle = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al procesar inicio de sesión con Google', error);
    }
  };

  return (
    
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginFailure}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
