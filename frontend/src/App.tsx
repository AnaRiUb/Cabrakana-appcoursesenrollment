import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterDesktopandMobile from './components/Footer/FooterDesktopandMobile';
import NavBar from './components/Navbar/NavBar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ForumPage from './pages/ForumPage';
import ForumCommentsPage from './pages/ForumCommentsPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import CreatedEventsPage from './pages/CreatedEventsPage';
import FollowedEventsPage from './pages/FollowedEventsPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import CreatedForumPage from './pages/CreatedForumPage';
import ProfileButton from './components/Profile/ProfileButton';
import './App.css';
import './index.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(''); 
  const [userDescription, setUserDescription] = useState<string>(''); 
  const [userAge, setUserAge] = useState<number>(0); 
  const [isAgeVisible, setIsAgeVisible] = useState<boolean>(false);
  // const [notificationCount, setNotificationCount] = useState<number>(0); 

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userImage = localStorage.getItem('profile_image');
    const gender = localStorage.getItem('gender');
    const description = localStorage.getItem('description');
    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      setIsAuthenticated(true);
      setUserName(parsedToken.name || 'Usuario');
      setProfileImageUrl(userImage || '');
      setUserDescription(description || '');
    }
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  const onUpdateProfile = async (
    newAvatar: string,
    newGender: string,
    newDescription: string,
    newAge: number,
    isAgeVisible: boolean
  ) => {

    setProfileImageUrl(newAvatar);
    
    const user_id = localStorage.getItem('user_id');
  

    console.log("Imagen de perfil actualizada:", newAvatar);  

    console.log('Perfil actualizado:', {
      newAvatar,
      newGender,
      newDescription,
      newAge,
      isAgeVisible,
    });

    if (user_id) {
      try {
        const response = await fetch('http://localhost:4000/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
            newAvatar,
            newGender,
            newDescription,
            newAge,
            isAgeVisible,
          }),
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
         
          setUserDescription(newDescription);
          setUserAge(newAge);
          setIsAgeVisible(isAgeVisible);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un error al actualizar el perfil');
      }
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <NavBar 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          setIsAuthenticated={setIsAuthenticated}
          profileImageUrl={profileImageUrl} 
          notificationCount={0}           
          />
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/forums" element={<ForumPage />} />
            <Route path="/forum-comments" element={<ForumCommentsPage />} />
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
                  userAvatar={profileImageUrl}
                  userName={userName || 'Usuario'}
                  userDescription={userDescription}
                  userAge={0}
                  isAgeVisible={false}
                />
              }
            />
            <Route
              path="/edit-profile"
              element={
                <EditProfilePage
                  userAvatar={profileImageUrl}
                  userGender=""
                  userDescription={userDescription}
                  userAge={0}
                  isAgeVisible={false}
                  onUpdateProfile={onUpdateProfile}
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
