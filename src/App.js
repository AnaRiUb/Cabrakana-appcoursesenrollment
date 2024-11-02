import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
// Importar otros componentes

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Definir rutas aquí */}
      </Routes>
    </Router>
  );
};

export default App;
