import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ForumSearch from '../components/Forums/ForumSearch';
import ForumCommentCard from '../components/ForumComments/ForumCommentCard';
import MyCreatedForumCommentsButton from '../components/ForumComments/MyCreatedForumCommenstButton';

interface ForumComments {
  comment_id: string;
  comment_text: string;
  comment_date:string,
  comment_time:string
  user:{
    username:string,
    email:string,
    profile_image:string,
   
 }
}

const ForumsCommentPage: React.FC = () => {
  const [forums, setForums] = useState<ForumComments[]>([]);
  const [filteredForums, setFilteredForums] = useState<ForumComments[]>([]); // Estado para los foros filtrados
  const [loading, setLoading] = useState<boolean>(true);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [forumTitle, setForumTitle] = useState<string>('');
  const [forumDescription, setForumDescription] = useState<string>('');
  const [forumCreator, setForumCreator] = useState<string>('');

  useEffect(() => {
    
    const forumId = localStorage.getItem('forum_id')

    const forum_title = localStorage.getItem('forum_title')
    const forum_description = localStorage.getItem('forum_description')
    const forum_creator = localStorage.getItem('forum_creator')


    setForumTitle(forum_title ?? '');
    setForumDescription(forum_description ?? '');
    setForumCreator(forum_creator ?? '');
    const fetchForums = async () => {

      if (!forumId) {
        console.error('No se encontró forum_id en el localStorage');
        return;
      }

      try {
       const response = await fetch(`http://localhost:4000/forumComments/${forumId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los foros');
        }
        const data = await response.json();
        setForums(data);
        setFilteredForums(data); // Al principio, los foros filtrados son iguales a todos los foros
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
      setFilteredForums(forums); // Si no hay búsqueda, mostramos todos los foros
    } else {
      const filtered = forums.filter((forum) =>
        forum.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forum.comment_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredForums(filtered); // Filtramos los foros según el término de búsqueda
    }
  };
  const handleCreateComment = (newComment: { comment_text: string }) => {
    // Aquí puedes agregar la lógica para crear el comentario en tu backend.
    // Por ejemplo, hacer un POST a tu API y luego actualizar el estado local.
    console.log('Nuevo comentario:', newComment);
    // Después de crear el comentario, cierra el modal:
    setShowCommentModal(false);
    // También puedes actualizar el estado `forums` y `filteredForums` con el nuevo comentario.
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
        <button
          onClick={() => setShowCommentModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Comentario
        </button>
      </div>

      {/* Mostrar el título y la descripción del foro antes de los comentarios */}
      <div className="p-4 m-2 bg-white rounded shadow-md">
        {loading ? (
          <p>Cargando datos del foro...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">{forumTitle}</h2>
            <p className="text-gray-700 mb-4">{forumDescription}</p>
            <label className="text-xs text-gray-700 mb-2">Creado por: {forumCreator}</label>
          </>
        )}
      </div>

      <MyCreatedForumCommentsButton
        visible={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        onCreate={handleCreateComment}
      />

      <div className="p-4 m-2 flex flex-col justify-center gap-4">
        <p>{loading ? 'Cargando foros...' : `${filteredForums.length} nuevos comentarios`}</p>

        {loading ? (
          <p>Cargando...</p>
        ) : filteredForums.length > 0 ? (
          filteredForums.map((forum) => (
            <ForumCommentCard
            key={forum.comment_id}
            email={forum.user.email}
            comment_text={forum.comment_text}
            username={forum.user.username}
            comment_date={forum.comment_date} 
            comment_time={forum.comment_time}  
            profile_image={forum.user.profile_image} 
            />
          ))
        ) : (
          <p>No hay foros disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ForumsCommentPage;
