import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Components/Pages/Login.jsx';
import Synap from '../Components/Pages/SyngUp.jsx';
import { FetchUser } from '../services/PostUser.jsx';

export const AuthRouts = () => {
  const user = localStorage.getItem('@harvelnotes:user');
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/cadastro"
        element={
          <FetchUser>
            <Synap />
          </FetchUser>
        }
      />
      {!user && <Route path="*" element={<Navigate to="/" replace />} />}
    </Routes>
  );
};
