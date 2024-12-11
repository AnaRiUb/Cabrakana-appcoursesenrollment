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
  const [filteredForums, setFilteredForums] = useState<ForumComments[]>([]); 
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
        forum.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forum.comment_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredForums(filtered); 
    }
  };
  const handleCreateComment = (newComment: { comment_text: string }) => {
  
    console.log('Nuevo comentario:', newComment);
    setShowCommentModal(false);
    
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

     
      <div className="max-w-6xl mx-auto p-4 px-8 m-2 bg-white/75 rounded shadow-md">
        {loading ? (
          <p>Cargando datos del foro...</p>
        ) : (
          <>
            <h2 className="mx-8 text-2xl font-bold mb-2">{forumTitle}</h2>
            <p className="p-8 bg-white text-gray-700 mb-4">{forumDescription}</p>
            <label className="mx-8 text-xs text-gray-700 mb-2">Creado por: {forumCreator}</label>
          </>
        )}
      </div>
        <div className='flex justify-center'>
          <MyCreatedForumCommentsButton
            visible={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            onCreate={handleCreateComment}
          />

            <button
              onClick={() => setShowCommentModal(true)}
              className="mt-5 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Agregar Comentario
            </button>
        </div>

      <div className="max-w-6xl mx-auto p-4 m-2 flex flex-col justify-center gap-4">
        <p>{loading ? 'Cargando foros...' : `${filteredForums.length} nuevos comentarios`}</p>

        {loading ? (
          <p>Cargando...</p>
        ) : filteredForums.length > 0 ? (
          filteredForums.map((forum) => (
            <ForumCommentCard
            key={forum.comment_id}
            email={""}
            comment_text={forum.comment_text}
            username={forum.user.username}
            comment_date={forum.comment_date} 
            comment_time={forum.comment_time}  
            profile_image={forum.user.profile_image} 
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ForumsCommentPage;
