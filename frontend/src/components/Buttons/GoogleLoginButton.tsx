import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
interface MyToken {
  name: string;
  token: string;
  email:string;
  // whatever else is in the JWT.
}
const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();  // Para manejar el login en el contexto
  const navigate = useNavigate();  // Para redirigir después de la autenticación

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;
    if (token) {
      try {
        // Llamada al backend con el token de Google
        const backendResponse = await fetch('http://localhost:4000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await backendResponse.json();
        
        if (backendResponse.ok) {
          // Si la respuesta es positiva, se guarda el token recibido
          login(data.token);  // Guardamos el token en el contexto de autenticación
          console.log(data.token);

          console.log(data);

          const decoded = jwtDecode<MyToken>(data.token);
        const decoded2 = jwtDecode<MyToken>(response.credential);
        console.log(decoded2);
          console.log('Usuario decodificado:', decoded);
          localStorage.setItem('userToken', JSON.stringify(decoded2));
          
          console.log('Usuario decodificado:', decoded2.email);
          // Redirige a la página de inicio
          navigate('/');

          //Hora de hacer un post con fetch
          try {
            const response = await fetch("http://localhost:4000/users/"+ decoded2.email , {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
          
            });
      
            const data = await response.json();
            localStorage.setItem('user_id', data.user_id);
          console.log(data.user_id);
          } catch (error) {
            console.error("Error al traer el user:", error);
           
          }


        } else {
          alert(data.message || 'Error en la autenticación');
        }
      } catch (error) {
        console.error('Error al procesar inicio de sesión con Google', error);
      }
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Error al iniciar sesión con Google:', error);
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
