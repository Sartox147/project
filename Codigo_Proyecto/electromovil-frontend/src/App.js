import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuario from './components/Usuario';
import Inicio from './components/Inicio';
import LoginRegister from './components/LoginRegister';
import QuienesSomos from './components/QuienesSomos';
import Perfil from './components/perfil';
import Tecnico from './components/Tecnico';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>        
          <Route path="/Usuario" element={<Usuario/>} />
          <Route path="/" element={<Inicio/>} />
          <Route path="/LoginRegister" element={<LoginRegister/>} />
          <Route path="/QuienesSomos" element={<QuienesSomos/>} />
          <Route path="/UserProfile" element={<Perfil />} />
          <Route path="/Tecnico" element={<Tecnico />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;