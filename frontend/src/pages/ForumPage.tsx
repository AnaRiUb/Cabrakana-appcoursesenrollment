import React from 'react';
import { Link } from 'react-router-dom';
import ForumSearch from '../components/Forums/ForumSearch';
import ForumList from '../components/Forums/ForumList';
import ForumCard from '../components/Forums/ForumCard';


const Forums: React.FC = () => {

  return (
    <div>
      <div className= "p-4 m-2 flex justify-center gap-4">
      
      <ForumSearch onSearch={function (): void {
          throw new Error('Function not implemented.');
        } } />

     <Link to="/created-forums"> <button className='bg-white rounded-lg p-2 font-bold shadow-md text-pink-500'> Mis foros </button> </Link>
    
      </div>

      <div className='p-4 m-2 flex flex-col justify-center gap-4'>

      <p> 550 new posts</p>

      <ForumList forums={[]} />
     
      <ForumCard key={"forum.id"} title={'Mandarina'} description={'mandarinas por el mundo'} author={'user123213'} createdAt={'15/01/1996'} image={''}  />
      <ForumCard key={"forum.id"} title={'Manzanas'} description={'manzanas por el mundo'} author={'user123213'} createdAt={'15/01/1996'} image={''}  />
      <ForumCard key={"forum.id"} title={'Platanos'} description={'platanos por el mundo'} author={'user123213'} createdAt={'15/01/1996'} image={''}  />
      

      </div>

    </div>
  );
};

export default Forums;
