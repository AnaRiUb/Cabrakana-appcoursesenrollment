import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import LoginForm from './components/Forms/LoginForm';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);



  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      setIsAuthenticated(true);
      setUserName(parsedToken.name || 'Usuario');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
   
      <Router>

        <div className="app-container">
       
          <header>
            <NavBar
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              setIsAuthenticated={setIsAuthenticated}
            />
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
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    userAvatar=""
                    userName={userName || 'Usuario'}
                    userDescription=""
                    userAge={0}
                    isAgeVisible={false}
                  />
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <EditProfilePage
                    userAvatar=""
                    userGender=""
                    onUpdateProfile={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    userDescription=""
                    userAge={0}
                    isAgeVisible={false}
                  />
                }
              />
            </Routes>
          </main>

          <footer>
            <FooterDesktopandMobile />
          </footer>
        </div>

      </Router> 
      
  
  );
};

export default App;