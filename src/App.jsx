// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Shared/Header/Header.jsx';
import { Navbar } from './components/Shared/Navbar/Navbar.jsx';
import { Game } from './pages/GamePage.jsx';
import { Stats } from './pages/StatsPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/stats" element={<Stats/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;