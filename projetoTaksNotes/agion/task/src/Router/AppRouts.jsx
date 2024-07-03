import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Components/Pages/Home.jsx';
import { Details } from '../Details/Index.jsx';
import Profile from '../Components/Pages/Profile.jsx';
import CadastreNotas from '../Components/Pages/CadastreNotas.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cadastrarnotas" element={<CadastreNotas />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRoutes };
