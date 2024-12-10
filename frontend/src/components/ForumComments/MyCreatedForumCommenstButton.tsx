import React, { useState, useEffect } from "react";

interface MyCreatedForumCommentsButtonProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (comment: { comment_text: string }) => void;
}

const MyCreatedForumCommentsButton: React.FC<MyCreatedForumCommentsButtonProps> = ({ visible, onClose, onCreate }) => {
  const [formValues, setFormValues] = useState({
    description: "",
  });

  useEffect(() => {
    if (!visible) {
      // Reiniciar los valores del formulario al cerrar el modal
      setFormValues({ description: "" });
    }
  }, [visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newComment = {
      forum_id: localStorage.getItem("forum_id"),
      comment_text: formValues.description,
      user_id: localStorage.getItem("user_id"),
    };

    try {
      // Realiza la petición POST
      const response = await fetch("http://localhost:4000/forumComments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Error al crear el comentario");
      }

      const createdComment = await response.json();
      console.log("Comentario creado con éxito:", createdComment);

      // Llamar a la función onCreate con los datos del nuevo comentario
      onCreate({ comment_text: formValues.description });
      onClose(); // Cierra el modal

      // Refrescar la página después de crear el comentario
      window.location.reload();
      
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      alert("Hubo un error al crear el comentario.");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Crear un nuevo comentario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Comentario del foro:
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded p-2"
              placeholder="Ingrese el comentario"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={onClose}
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
  );
};

export default MyCreatedForumCommentsButton;
