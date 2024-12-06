import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  image: string;
  price: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, author, createdAt, image, price }) => {
  return (
    <div className="course-card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{author}</p>
      <p>{createdAt}</p>
      <p>{price}</p>
    </div>
  );
};

export default CourseCard;