import { createContext, useEffect, useState } from 'react';
import { api } from './api.js';
export const ContextUser = createContext();
import { useNavigate } from 'react-router-dom';
export const FetchUser = ({ children }) => {
  const navigate = useNavigate();
  const PostUseres = async (name, email, password) => {
    let DadosUser = {
      name,
      password,
      email,
    };
    try {
      const response = await api.post('users', DadosUser);
      if (response.status !== 201) {
        return;
      }
      alert(response.data.message);
      navigate(-1);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <ContextUser.Provider value={{ PostUseres }}>
      {children}
    </ContextUser.Provider>
  );
};
