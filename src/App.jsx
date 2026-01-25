import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';


export default function App() {
return (
<div className="app-root">
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/projects" element={<ProjectsPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="*" element={<Home />} />
</Routes>
<Footer />
</div>
);
}