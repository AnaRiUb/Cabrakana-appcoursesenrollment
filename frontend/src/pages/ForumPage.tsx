import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForumSearch from '../components/Forums/ForumSearch';
import ForumCard from '../components/Forums/ForumCard';

interface Forum {
  forum_id: string;
  creator: {
    username: string;
    profile_image: string;
  } ;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
}

const Forums: React.FC = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [filteredForums, setFilteredForums] = useState<Forum[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch(`http://${apiUrl}/forums`);
        if (!response.ok) {
          throw new Error('Error al obtener los foros');
        }
        const data = await response.json();
        setForums(data);
        setFilteredForums(data); 
      } catch (error) {
        console.error('Error al obtener los foros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setFilteredForums(forums);
    } else {
      const filtered = forums.filter((forum) =>
        forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forum.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredForums(filtered);
    }
  };

  const handleForumClick = (forum_id: string, title: string, description: string, creator: string) => {

    localStorage.setItem('forum_id', forum_id);
    localStorage.setItem('forum_title', title);
    localStorage.setItem('forum_description', description);
    localStorage.setItem('forum_creator', creator);
    

    navigate('/forum-comments');
  };

  return (
    <div>
      <div className="p-4 m-2 flex justify-center gap-4">
        <ForumSearch onSearch={handleSearch} />
        <Link to="/created-forums">
          <button className="bg-white rounded-lg p-2 font-bold shadow-md text-pink-500">
            Mis foros
          </button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-4 m-2 flex flex-col justify-center gap-4">
        <p>{loading ? 'Cargando foros...' : `${filteredForums.length} nuevos posts`}</p>

        {loading ? (
          <p>Cargando...</p>
        ) : filteredForums.length > 0 ? (
          filteredForums.map((forum) => (
            <ForumCard
              key={forum.forum_id}
              title={forum.title}
              description={forum.description}
              author={forum.creator.username}
              createdAt={new Date(forum.created_at).toLocaleDateString()}
              image={forum.creator.profile_image}
              onClick={() => handleForumClick(forum.forum_id, forum.title, forum.description, forum.creator.username)}
            />
          ))
        ) : (
          <p>No hay foros disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Forums;
