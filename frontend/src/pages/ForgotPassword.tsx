import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Recuperación de contraseña para:', email);
    
    
    setMessage('Te hemos enviado un correo para restablecer tu contraseña.');
  };

  return (
  <body className='flex justify-center items-center'>
    <section className="bg-pink-500/20 rounded-lg px-2 py-2 w-96 h-auto md:w-2/3">
      <div className="flex flex-col md:flex-row justify-center px-4 py-4">
        {/* Formulario */}
        <div className="md:w-1/2 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a href="/" className="flex justify-center items-center mb-6 text-2xl font-semibold text-pink-500">
              Piwis
              <img className="rounded-full bg-pink-50 w-8 h-8 mr-2" src="/svg/mi-icono.svg" alt="logo" />
            </a>

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Recuperar contraseña
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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

              <button
                type="submit"
                className="w-full text-black bg-green-400/75 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Enviar correo de recuperación
              </button>
            </form>

            {message && <p className="mt-4 text-green-500">{message}</p>}

            <p className="text-sm font-light text-gray-500">
              <a href="/login" className="font-medium text-purple-700 hover:underline">
                Volver a iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </body>
  );
};

export default ForgotPassword;
