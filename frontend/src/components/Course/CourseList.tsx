import React from 'react';
import CourseCard from '../Course/CourseCard';

interface Course {
  course_id: string;
  title: string;
  description: string;
  image_url: string | null;
  price: string;
  course_code: string;
  created_at: string;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="forum-list grid gap-4">
      {courses.map((course) => (
        <CourseCard
        key={course.course_id}
        title={course.title}
        description={course.description}
        author={`Código: ${course.course_code}`}
        createdAt={new Date(course.created_at).toLocaleDateString()}
        image={course.image_url || ''}
        price={`$${course.price}`}       />
      ))}
    </div>
  );
};


export default CourseList;
