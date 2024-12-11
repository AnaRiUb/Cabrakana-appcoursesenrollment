import React, { useState, useEffect } from 'react';

interface EditProfilePageProps {
  userAvatar: string;
  userGender: string;
  userDescription: string;
  userAge: number;
  isAgeVisible: boolean;
  onUpdateProfile: (
    newAvatar: string,
    newGender: string,
    newDescription: string,
    newAge: number,
    isAgeVisible: boolean
  ) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({
  userAvatar,
  userGender,
  userDescription,
  userAge,
  isAgeVisible,
  onUpdateProfile,
}) => {
  const [newAvatar, setNewAvatar] = useState<string>(userAvatar);
  const [newGender, setNewGender] = useState<string>(userGender);
  const [newDescription, setNewDescription] = useState<string>(userDescription);
  const [newAge, setNewAge] = useState<number>(userAge);
  const [ageVisible, setAgeVisible] = useState<boolean>(isAgeVisible);
 const user_id = 'd1c066d5-9c9a-4f8d-ae28-bb3a6452ea10';
  useEffect(() => {
    // Inicializar la imagen según el género cuando se carga el componente
    if (newGender === 'hombre') {
      setNewAvatar('https://res.cloudinary.com/dyg2tq33j/image/upload/v1733872516/ednqgmor7rpybo7werke.svg');
    } else if (newGender === 'mujer') {
      setNewAvatar('https://res.cloudinary.com/dyg2tq33j/image/upload/v1733872553/ff1hg1ootyzk1o001zrb.svg');
    } else if (newGender === 'prefiero no decirlo') {
      setNewAvatar('https://res.cloudinary.com/dyg2tq33j/image/upload/v1733872575/or828hsidnlszsaujkjl.svg');
    }
  }, [newGender]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    setNewGender(selectedGender);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onUpdateProfile(newAvatar, newGender, newDescription, newAge, ageVisible);

    try {
      const response = await fetch('http://localhost:4000/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          newAvatar,
          newGender,
          newDescription,
          newAge,
          isAgeVisible,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
       
        alert('Perfil actualizado correctamente');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil');
    }
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>

      <form onSubmit={handleSubmit}>
        {/* Foto de Perfil */}
        <div className="mb-6">
          <label className="block text-m font-medium text-gray-700 mb-6">Foto de Perfil</label>
          <div className="flex flex-col items-center m-2 gap-2">
            <img
              src={newAvatar}
              alt="Foto de perfil"
              className="w-20 h-auto rounded-full object-cover border mr-4"
            />
          </div>
        </div>

        {/* Género */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="hombre"
                checked={newGender === 'hombre'}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Hombre
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="mujer"
                checked={newGender === 'mujer'}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Mujer
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="prefiero no decirlo"
                checked={newGender === 'prefiero no decirlo'}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Prefiero no decirlo
            </label>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm"
            placeholder="Escribe algo sobre ti..."
          />
        </div>

        {/* Edad */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
          <input
            type="number"
            value={newAge}
            onChange={(e) => setNewAge(Number(e.target.value))}
            className="border p-2 rounded-lg text-sm w-full"
            placeholder="Introduce tu edad"
            min="0"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6">
            <input
              type="checkbox"
              checked={ageVisible}
              onChange={(e) => setAgeVisible(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">¿Mostrar mi edad en el perfil?</label>
          </div>

          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
