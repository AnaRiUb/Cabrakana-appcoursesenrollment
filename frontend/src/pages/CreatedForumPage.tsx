import React, { useState, useEffect } from "react";
import MyCreatedForumsButton from "../components/Forums/MyCreatedForumsButton";

interface Forum {
  id: string;
  title: string;
  description: string;
}

const CreatedForumPage: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([]); // Estado para almacenar foros
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Obtener el user_id desde localStorage
  const user_id = localStorage.getItem("user_id") || ""; // Si no existe, usa una cadena vacía

  useEffect(() => {
    if (user_id) { // Verifica que user_id no sea vacío
      const fetchForums = async () => {
        try {
          const response = await fetch(`http://localhost:4000/forums/${user_id}`);
          
          if (!response.ok) {
            throw new Error("No tienes ningun foro registrado por ti");
          }
          
          const data = await response.json();
          setForums(data); // Actualiza el estado con los foros obtenidos del API
        } catch (err: any) {
          setError(err.message); // Establece el error si ocurre
        } finally {
          setLoading(false); // Cambia el estado de carga a false cuando se complete
        }
      };

      fetchForums();
    } else {
      console.error("No se encontró el user_id en localStorage.");
    }
  }, [user_id]); // El useEffect se ejecutará al montar el componente y cuando cambie el user_id

  const addNewForum = (newForum: Forum) => {
    setForums((prevForums) => [...prevForums, newForum]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis foros</h1>
        <MyCreatedForumsButton onCreate={addNewForum} />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Foros que estás moderando</h2>
        {loading ? (
          <p>Cargando foros...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : forums.length > 0 ? (
          <ul className="space-y-4">
            {forums.map((forum) => (
              <li
                key={forum.id}
                className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">{forum.title}</h3>
                <p className="text-gray-600">{forum.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No has creado ningún foro todavía.</p>
        )}
      </div>
    </div>
  );
};

export default CreatedForumPage;
