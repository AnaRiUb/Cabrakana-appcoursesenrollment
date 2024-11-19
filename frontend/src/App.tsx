import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ForumPage from './pages/ForumPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import CreatedEventsPage from './pages/CreatedEventsPage';
import FollowedEventsPage from './pages/FollowedEventsPage';
import './App.css';

const App: React.FC = () => {
  const isAuthenticated = true; 

  return (
    <div>
    
   
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/forums" element={<ForumPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/created-events" element={<CreatedEventsPage />} />
          <Route path="/followed-events" element={<FollowedEventsPage />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
