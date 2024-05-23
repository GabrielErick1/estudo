import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRouts.jsx';
import { AuthRouts } from './AuthRouts.jsx';
import { useAuth } from '../services/Auth';

export const Index = () => {
  const { user } = useAuth();

  return <BrowserRouter>{user ? <AppRoutes /> : <AuthRouts />}</BrowserRouter>;
};
