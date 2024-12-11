import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleSignInButton from '../Buttons/GoogleSignInButton';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const userData = {
      name,
      username,
      email,
      password,
    };
  

    console.log('Registro de usuario:', { name, username, email, password });
    try {
      const response = await fetch(`http://${apiUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      const data = await response.json();
      alert('Usuario registrado con éxito');
      console.log('Registro exitoso:', data);
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Hubo un problema durante el registro. Intenta nuevamente.');
    }
  };
  

  return (
    <section className="bg-pink-500/20 rounded-lg px-2 py-2 h-auto w-2/3">
      <div className="flex flex-col md:flex-row justify-center px-4 py-4 md:h-auto">
        <div className="bg-white rounded-lg shadow md:mt-0 md:w-full sm:max-w-md">
          <div className="p-6 space-y-4 md:w-full md:space-y-6 sm:p-8">
            <Link to="/" className="flex justify-center items-center mb-6 text-2xl font-semibold text-pink-500">
              Piwis
              <img className="rounded-full bg-pink-50 w-8 h-8 mr-2" src="/svg/mi-icono.svg" alt="logo" />
            </Link>

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Crea una nueva cuenta
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Usuario123"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-black bg-green-400/75 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Registrarse
              </button>
              <GoogleSignInButton />
              <p className="text-sm font-light text-gray-500 text-center ">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-medium text-primary-600 text-purple-700 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </form>
          
            
   




          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
