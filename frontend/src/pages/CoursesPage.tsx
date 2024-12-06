import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/Carousel/ImageCarousel';
import CourseList from '../components/Course/CourseList';
import CourseCard from '../components/Course/CourseCard';
import { Link } from "react-router-dom";

// Definimos el tipo de los datos que devuelve la API
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
  const [courses, setCourses] = useState<Course[]>([]); // Estado para almacenar los cursos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función para obtener los datos de la API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/courses'); // Cambia la URL por la de tu API
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="p-4 m-2 flex justify-center gap-4">
        <ImageCarousel />
        <Link to="/created-courses">
          <button className="bg-white rounded-lg p-2 font-bold shadow-md text-pink-500">
            Mis cursos
          </button>
        </Link>
      </div>

      <div className="p-4 m-2 flex flex-col justify-center gap-4">
        <p>550 new posts</p>

         {loading ? (
          <p>Cargando cursos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : courses.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
            courses.map((course) => (
              <CourseCard
                key={course.course_id}
                title={course.title}
                description={course.description}
                author={`Código: ${course.course_code}`}
                createdAt={new Date(course.created_at).toLocaleDateString()}
                image={course.image_url || ''}
                price={`$${course.price}`}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default CoursesPage;
