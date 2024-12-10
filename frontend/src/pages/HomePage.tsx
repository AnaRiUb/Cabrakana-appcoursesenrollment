import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ImageCarouselHome from "../components/Carousel/ImageCarouselHome";

const HomePage: React.FC = () => {
  const { token } = useAuth();
  
  type GenderType = 'Hombre' | 'Mujer' | 'Prefiero no decirlo' |  null;
  const [gender, setGender] = useState<GenderType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string>("Usuario");

  useEffect(() => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const parsedToken = JSON.parse(userToken);
        setIsAuthenticated(true);
        setUserName(parsedToken.name || 'Usuario');
        setGender(parsedToken.gender || null);
      }
    } catch (error) {
      console.error('Error al leer el token del localStorage:', error);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Mostrar contenido basado en si el usuario está autenticado */}

      {!isAuthenticated && (
        <section className="m-8 p-4 flex gap-6 flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4">Bienvenidos a Piwis</h1>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Explora cursos, participa en foros y crea eventos educativos. ¡Únete a nuestra comunidad de aprendizaje!
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-gray-100"
            >
              Regístrate Gratis
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-md font-semibold hover:bg-gray-100"
            >
              Iniciar sesión
            </Link>
          </div>
        </section>
      )}

      {isAuthenticated && (
        <>
          <p className="flex justify-center items-center text-center m-4">
              Bienvenid{gender === 'Hombre' ? 'o' : gender === 'Mujer' ? 'a' : gender === 'Prefiero no decirlo' ? 'e' : 'o(a)'}{' '}
              <Link to="/profile"> <strong className="ml-1">{userName}</strong> </Link>
              ,estas autenticad{gender === 'Hombre' ? 'o' : gender === 'Mujer' ? 'a' : gender === 'Prefiero no decirlo' ? 'e' : 'o(a)'}{' '}.
          </p>
          <section className="m-8 p-4 flex gap-6 flex-col items-center justify-center text-center bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-8 rounded-lg shadow-xl">
            <p className="text-4xl font-bold mb-4">
              ¡Bienvenid{gender === 'Hombre' ? 'o' : gender === 'Mujer' ? 'a' : gender === 'Prefiero no decirlo' ? 'e' : 'o(a)'}{' '}, {userName}!
            </p>
            <p className="text-lg mb-6">
              Estás dentro de la comunidad de Piwis, disfruta de nuestros cursos, foros y eventos.
            </p>
          </section>
      </>
      )}

      {/* Carousel y otras secciones */}
      <section className="my-12 p-4 lg:w-4/5 h-auto mx-auto">
        <div className="p-4 flex justify-center">
          <ImageCarouselHome />
        </div>
        <h2 className="text-2xl font-bold text-center my-8 text-gray-700">
          Descubre Nuestros Cursos Destacados
        </h2>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cursos */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">Cursos</h3>
          <p className="text-gray-600 mb-4">
            Aprende a tu ritmo con nuestros cursos diseñados por expertos.
          </p>
          <Link
            to="/courses"
            className="text-white bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-700"
          >
            Ver Cursos
          </Link>
        </div>

        {/* Foros */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold mb-4 text-purple-600">Foros</h3>
          <p className="text-gray-600 mb-4">
            Únete a la conversación, resuelve tus dudas y comparte tus ideas.
          </p>
          <Link
            to="/forums"
            className="text-white bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-700"
          >
            Participar en Foros
          </Link>
        </div>

        {/* Eventos */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold mb-4 text-green-600">Eventos</h3>
          <p className="text-gray-600 mb-4">
            Organiza y participa en eventos educativos junto a la comunidad.
          </p>
          <Link
            to="/events"
            className="text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700"
          >
            Crear Evento
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        <p>© 2024 Piwis. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
