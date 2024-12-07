import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext";
import FooterDesktopandMobile from './components/Footer/FooterDesktopandMobile';
import NavBar from './components/Navbar/NavBar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ForumPage from './pages/ForumPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import CreatedEventsPage from './pages/CreatedEventsPage';
import FollowedEventsPage from './pages/FollowedEventsPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import CreatedForumPage from './pages/CreatedForumPage';

import './App.css';
import './index.css';
import Login from './components/Forms/LoginState';



const App: React.FC = () => {
 //const { token } = useAuth();
 const [isAuthenticate, setIsAuthenticated] = useState(false); 
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('Usuario cerró sesión');
  };

  return (
    <AuthProvider>

        <Router> 
          <div className="app-container">
            <Login />
            <header>
          <NavBar isAuthenticated={isAuthenticate} onLogout={handleLogout} />
          {!isAuthenticate ? (
            <button className='bg-pink-400 rounded-full m-4 p-4 font-bold shadow-md ' onClick={handleLogin}>
              Iniciar Sesión
            </button>
          ) : (
            <p className=' flex justify-center items-center text-center m-4'>
            Bienvenido {`Nombre`} , estás autenticado.
            </p>
          )}


      
            </header>

            <main className="main-content">
            <Routes> 
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/forums" element={<ForumPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/created-events" element={<CreatedEventsPage />} />
              <Route path="/followed-events" element={<FollowedEventsPage />} />
              <Route path="/created-forums" element={<CreatedForumPage />} />
              <Route path="/profile" element={<ProfilePage userAvatar={''} userName={''} userDescription={''} userAge={0} isAgeVisible={false} />} />
              <Route path="/edit-profile" element={<EditProfilePage userAvatar={''} userGender={''} onUpdateProfile={function (newAvatar: string, newGender: string): void {
                  throw new Error('Function not implemented.');
                } } userDescription={''} userAge={0} isAgeVisible={false} />} />
            </Routes>
            </main>

            <footer>
              <FooterDesktopandMobile />
            </footer>

          
          </div>
        </Router> 
    </AuthProvider>
  );
};

export default App;
