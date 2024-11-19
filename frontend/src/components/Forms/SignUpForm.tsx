import React, { useState } from 'react';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de registro
    console.log('Registro de usuario:', { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form p-4 bg-white shadow-md rounded">
      <label className="block mb-2">
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Registrarse</button>
    </form>
  );
};

export default SignUpForm;
