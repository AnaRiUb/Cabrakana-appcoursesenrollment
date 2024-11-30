import React, { useState } from "react";
import MyCreatedForumsButton from "../components/Forums/MyCreatedForumsButton";

interface Forum {
  id: string;
  title: string;
  description: string;
}

const CreatedForumPage: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([
    { id: "1", title: "Foro de Tecnología", description: "Discute sobre lo último en tecnología." },
    { id: "2", title: "Foro de Cine", description: "Comparte y comenta tus películas favoritas." },
  ]);

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
        {forums.length > 0 ? (
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
          <p className="text-gray-500">No estás moderando ningún foro actualmente.</p>
        )}
      </div>
    </div>
  );
};

export default CreatedForumPage;
