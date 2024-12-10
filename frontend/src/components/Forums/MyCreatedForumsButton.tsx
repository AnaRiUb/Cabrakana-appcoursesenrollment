import React, { useState } from "react";

interface MyCreatedForumsButtonProps {
  onCreate: (forum: { id: string; title: string; description: string }) => void;
}

const MyCreatedForumsButton: React.FC<MyCreatedForumsButtonProps> = ({ onCreate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormValues({ title: "", description: "" }); // Reiniciar valores del formulario
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newForum = {
      id: Date.now().toString(), // ID temporal, podría generarse desde el backend
      title: formValues.title,
      description: formValues.description,
      created_by: "ad235556-0eae-47a5-8d84-e3046e703eb0", // Reemplaza con el ID del creador si es necesario
      created_at: new Date().toISOString(),
    };

    try {
      // Realiza la petición POST usando fetch
      const response = await fetch("http://localhost:4000/forums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForum),
      });

      if (!response.ok) {
        throw new Error("Error al crear el foro");
      }

      const createdForum = await response.json();
      console.log("Foro creado con éxito:", createdForum);

      onCreate(newForum); // Llama al callback con los datos del foro
      handleCloseModal();
    } catch (error) {
      console.error("Error al crear el foro:", error);
      alert("Hubo un error al crear el foro.");
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={handleOpenModal}
      >
        Crear nuevo foro
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Crear un nuevo grupo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Nombre del grupo:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded p-2"
                  placeholder="Ingrese el nombre del grupo"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">
                  Descripción del foro:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded p-2"
                  placeholder="Ingrese la descripción del foro"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCreatedForumsButton;
