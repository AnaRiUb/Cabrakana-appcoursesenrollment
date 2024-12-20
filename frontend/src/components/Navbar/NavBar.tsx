import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../Profile/ProfileButton';
import ButtonHome from './ButtonHome';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  setIsAuthenticated: (value: boolean) => void;
  profileImageUrl: string; 
  notificationCount: number; 
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, setIsAuthenticated, onLogout, profileImageUrl, notificationCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-center items-center p-4 bg-white text-[#ee076d] max-w-6xl mx-auto mt-8 font-bold border-b-[14px] border-r-[14px] border-black">
      {/* Versión escritorio */}
      <div className="hidden md:flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Link to="/" className="text-[#ee076d] text-2xl font-bold">
              <ButtonHome />
            </Link>
          </div>
          <Link to="/" className="text-4xl text-[#ee076d] no-underline">
            Piwis
          </Link>
        </div>

        <ul className="flex list-none gap-6 text-lg">
          <li>
            <Link to="/courses" className="text-[#813838] hover:text-[#44e960] no-underline">
              Cursos
            </Link>
          </li>
          <li>
            <Link to="/forums" className="text-[#813838] hover:text-[#44e960] no-underline">
              Foros
            </Link>
          </li>
          <li>
            <Link to="/events" className="text-[#813838] hover:text-[#44e960] no-underline">
              Eventos
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="flex items-center">
                <ProfileButton profileImageUrl={profileImageUrl} notificationCount={notificationCount} /> {/* Pasar la imagen de perfil */}
              </li>
              <li>
                <button
                  className="bg-pink-200 rounded-full p-4 font-bold shadow-md"
                  onClick={onLogout}
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-[#813838] hover:text-[#44e960] no-underline">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-[#813838] hover:text-[#44e960] no-underline">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Versión móvil */}
      <div className="flex md:hidden w-full justify-between items-center">
        <button
          onClick={toggleMenu}
          className="text-xl text-black bg-none border-none cursor-pointer ml-8"
        >
          ☰
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-16 h-16 bg-[#f7d0e1] rounded-full">
            <Link to="/" className="text-[#ee076d] text-2xl font-bold">
              <ButtonHome />
            </Link>
          </div>
          <Link to="/" className="text-4xl text-[#ee076d] no-underline">
            Piwis
          </Link>
        </div>

        <div
          className={`fixed top-0 left-0 w-4/5 h-full bg-black bg-opacity-90 p-8 shadow-lg flex flex-col items-start z-10 transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            onClick={toggleMenu}
            className="text-xl text-white bg-none border-none self-end cursor-pointer"
          >
            ×
          </button>

          <ul className="flex flex-col list-none mt-8 space-y-4 text-lg">
            <li>
              <Link className="text-white hover:text-[#ffa500] no-underline" to="/" onClick={toggleMenu}>
                Piwis
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <ProfileButton profileImageUrl={profileImageUrl} notificationCount={notificationCount} /> 
                </li>
                <li>
                  <button
                    className="bg-pink-400 rounded-full m-4 p-4 font-bold shadow-md"
                    onClick={() => {
                      onLogout();
                      toggleMenu();
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="text-white hover:text-[#ffa500] no-underline" to="/login" onClick={toggleMenu}>
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link className="text-white hover:text-[#ffa500] no-underline" to="/signup" onClick={toggleMenu}>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
