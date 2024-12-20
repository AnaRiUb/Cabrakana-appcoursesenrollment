import React from 'react';
import ForumCard from '../Forums/ForumCard';

interface Forum {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

interface ForumListProps {
  forums: Forum[];
}

const ForumList: React.FC<ForumListProps> = ({ forums }) => {
  return (
    <div className="forum-list grid gap-4">
      {forums.map((forum) => (
        <ForumCard
          key={forum.id}
          title={forum.title}
          description={forum.description}
          author={forum.author}
          createdAt={forum.createdAt} 
          image={''}        />
      ))}
    </div>
  );
};

export default ForumList;
