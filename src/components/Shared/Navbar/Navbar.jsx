import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="main-nav">
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Live Match
            </NavLink>
            <NavLink
                to="/stats"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Statistiques
            </NavLink>
        </nav>
    );
};