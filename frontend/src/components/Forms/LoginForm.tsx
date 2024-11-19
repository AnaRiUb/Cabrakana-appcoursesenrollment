import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de inicio de sesión
    console.log('Inicio de sesión:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form p-4 bg-white shadow-md rounded">
      <label className="block mb-2">
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2">
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
