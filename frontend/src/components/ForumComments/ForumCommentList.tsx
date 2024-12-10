import React from 'react';
import ForumCommentCard from './ForumCommentCard';

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

interface ForumCommentsListProps {
  forums: ForumComments[];
}

const ForumList: React.FC<ForumCommentsListProps> = ({ forums }) => {
  return (
    <div className="forum-list grid gap-4">
      {forums.map((forum) => (
        <ForumCommentCard
          key={forum.comment_id}
          email={forum.user.email}
          comment_text={forum.comment_text}
          username={forum.user.username}
          comment_date={forum.comment_date} 
          comment_time={forum.comment_time}  
          profile_image={forum.user.profile_image}        />
      ))}
    </div>
  );
};

export default ForumList;
