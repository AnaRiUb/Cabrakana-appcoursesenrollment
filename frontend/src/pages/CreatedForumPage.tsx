import React, { useState, useEffect } from "react";
import MyCreatedForumsButton from "../components/Forums/MyCreatedForumsButton";

interface Forum {
  id: string;
  title: string;
  description: string;
}

const CreatedForumPage: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  
  const user_id = localStorage.getItem("user_id") || "";
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (user_id) {
      const fetchForums = async () => {
        try {
          const response = await fetch(`http://${apiUrl}/forums/${user_id}`);
          
          if (!response.ok) {
            throw new Error("No tienes ningun foro registrado. Aqui se mostraran los foros creados por ti.");
          }
          
          const data = await response.json();
          setForums(data); 
        } catch (err: any) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchForums();
    } else {
      console.error("No se encontró el user_id en localStorage.");
    }
  }, [user_id]);

  const addNewForum = (newForum: Forum) => {
    setForums((prevForums) => [...prevForums, newForum]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Mis foros</h1>
        <MyCreatedForumsButton onCreate={addNewForum} />
      </div>

      <div className="max-w-6xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl text-center font-semibold mb-4">Foros que estás moderando</h2>
        {loading ? (
          <p>Cargando foros...</p>
        ) : error ? (
          <p className="text-black"> {error}</p>
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
