import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Components/Pages/Login.jsx';
import Synap from '../Components/Pages/SyngUp.jsx';
import { FetchUser } from '../services/PostUser.jsx';

export const AuthRouts = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/cadastro"
        element={
          <FetchUser>
            <Synap />
          </FetchUser>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
