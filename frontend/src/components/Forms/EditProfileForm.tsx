import React, { useState } from 'react';

const EditProfileForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para actualizar el perfil
    console.log('Datos actualizados:', { name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form p-4 bg-white shadow-md rounded">
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Actualizar Perfil</button>
    </form>
  );
};

export default EditProfileForm;
