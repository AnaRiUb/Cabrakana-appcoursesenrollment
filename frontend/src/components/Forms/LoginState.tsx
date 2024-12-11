import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';


interface MyToken {
  name: string;
  token: string;
}
const Login = () => {
  const { login } = useAuth();
  const handleLoginSuccess = (response: any) => {
    console.log('Login exitoso:', response);

    try {
      const decoded = jwtDecode<MyToken>(response.credential);
  
  
      console.log('Usuario decodificado:', decoded);
      localStorage.setItem('userToken', JSON.stringify(decoded));
      if (decoded.name) {
        console.log('Nombre del usuario:', decoded.name);
        login(decoded.name);
      } else {
        console.error('No se encontró el nombre en el token decodificado.');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  };

  const handleLoginFailure = (error: any) => {
    console.error('Error en el login:', error);
  };

  return (
    <div>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
      
    </div>
  );
};

export default Login;
