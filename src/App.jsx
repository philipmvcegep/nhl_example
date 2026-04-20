// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Game } from './pages/GamePage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Habs Dashboard 🏒</h1>
        
        {/* Simple Navbar pour commencer */}
        <nav className="stats-summary">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Live Match</Link>
          <Link to="/stats" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '20px' }}>Statistiques</Link>
        </nav>

        <hr style={{ borderColor: 'var(--habs-blue)', margin: '20px 0' }} />

        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/stats" element={<div>À venir : Page de Statistiques</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;