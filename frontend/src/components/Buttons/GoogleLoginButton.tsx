import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
interface MyToken {
  name: string;
  token: string;
  email:string;
}
const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;
    if (token) {
      try {
        
        const backendResponse = await fetch('http://localhost:4000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await backendResponse.json();
        
        if (backendResponse.ok) {
          
          login(data.token); 
          console.log(data.token);

          console.log(data);

          const decoded = jwtDecode<MyToken>(data.token);
        const decoded2 = jwtDecode<MyToken>(response.credential);
        console.log(decoded2);
          console.log('Usuario decodificado:', decoded);
          localStorage.setItem('userToken', JSON.stringify(decoded2));
          
          console.log('Usuario decodificado:', decoded2.email);
 
          navigate('/');

       
          try {
            const response = await fetch("http://localhost:4000/users/"+ decoded2.email , {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
          
            });
      
            const data = await response.json();
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('profile_image', data.profile_image);
            localStorage.setItem('gender', data.gender);
            localStorage.setItem('description', data.description);
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
