import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/Carousel/ImageCarousel';
import CourseCard from '../components/Course/CourseCard';

interface Course {
  course_id: string;
  title: string;
  description: string;
  image_url: string | null;
  price: string;
  course_code: string;
  created_at: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/courses');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error al cargar los cursos.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* Carrusel */}
      <div className="w-full max-w-6xl mb-8">
        <ImageCarousel />
      </div>

    

      {/* Contenido principal */}
      <div className="px-8 w-full max-w-6xl">
        {loading ? (
          <p className="text-center text-gray-500">Cargando cursos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">No hay cursos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.course_id}
                title={course.title}
                description={course.description}
                author={`Código: ${course.course_code}`}
                createdAt={new Date(course.created_at).toLocaleDateString()}
                image={course.image_url || ''}
                price={`$${course.price}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
