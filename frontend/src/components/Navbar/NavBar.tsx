import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDataButton from '../Profile/ProfileDataButton'; // Este componente muestra los datos del perfil
import './NavBar.css';
import ButtonHome from './ButtonHome';


const NavBar: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
  };

  return (
    <nav className="navbar">
      {/* Versión de Escritorio */}
      <div className="navbar-desktop">
        <div className="navbar-logo">
          <div className="navbar-icon">
              <Link to="/" className="navbar-text">
              <ButtonHome /> 
              </Link>
          </div>
          <Link to="/" className="navbar-text">Piwis</Link>
        </div>

        <ul className="navbar-menu">
          <li><Link to="/courses">Cursos</Link></li>
          <li><Link to="/forums">Foros</Link></li>
          <li><Link to="/events">Eventos</Link></li>
          {isAuthenticated ? (
            <li><ProfileDataButton /></li>
          ) : (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/signup">Registrarse</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Versión Mobile */}
      <div className="navbar-mobile">
        <button onClick={toggleMenu} className="navbar-hamburger">
          ☰
        </button>
        
          <div className="navbar-logo">
              <div className="navbar-icon">
                    <Link to="/" className="navbar-text">
                    <ButtonHome /> 
                    </Link>
              </div>
              <Link to="/" className="navbar-text">Piwis</Link>
          </div>
    

        {isOpen && (
          <div className="navbar-drawer">
            <button onClick={toggleMenu} className="navbar-close">×</button>
            <ul className="navbar-drawer-menu">
              {isAuthenticated ? (
                <>
                  <li><ProfileDataButton /></li>
                  <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" onClick={toggleMenu}>Iniciar Sesión</Link></li>
                  <li><Link to="/signup" onClick={toggleMenu}>Registrarse</Link></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
