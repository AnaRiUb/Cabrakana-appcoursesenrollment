import React, { useState } from 'react';


interface EditProfilePageProps {
  userAvatar: string; // URL actual del avatar
  userGender: string; // Sexo actual del usuario
  userDescription: string; // Descripción del usuario
  userAge: number; // Edad del usuario
  isAgeVisible: boolean; // Visibilidad de la edad
  onUpdateProfile: (
    newAvatar: string,
    newGender: string,
    newDescription: string,
    newAge: number,
    isAgeVisible: boolean
  ) => void; // Función para actualizar
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

  // Función para cambiar automáticamente la imagen según el género
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    setNewGender(selectedGender);

    if (selectedGender === 'hombre') {
      setNewAvatar('svg/boyicon.svg');
    } else if (selectedGender === 'mujer') {
      setNewAvatar('svg/girlicon.svg');
    } else if (selectedGender === 'prefiero no decirlo') {
      setNewAvatar('svg/nottellingicon.svg');
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(reader.result as string); // Cambia la vista previa
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdateProfile(newAvatar, newGender, newDescription, newAge, ageVisible);
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
              src="svg/nottellingicon.svg"
              alt="Foto de perfil"
              className="w-20 h-auto rounded-full object-cover border mr-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border p-2 rounded-lg text-sm"
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

       <div className='flex flex-col items-center'>
          <div className="mb-6">
            <input
              type="checkbox"
              checked={ageVisible}
              onChange={(e) => setAgeVisible(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">¿Mostrar mi edad en el perfil?</label>
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            className=" bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200"
          >
            Guardar Cambios
          </button>
      
      </div>

      </form>
    </div>
  );
};

export default EditProfilePage;
