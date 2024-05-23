import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api.js';
import userInit from '../assets/useerannimo.jpg';
const AuthContext = createContext();

const Auth = ({ children }) => {
  const [data, setData] = useState({ user: null, token: null });
  const LoginUser = async ({ email, password }) => {
    try {
      const response = await api.post('/session', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('@harvelnotes:user', JSON.stringify(user));
      localStorage.setItem('@harvelnotes:token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };

  const updateUser = async ({ user, avatarFile }) => {
    try {
      if (avatarFile) {
        const fileForm = new FormData();
        fileForm.append('avatar', avatarFile);
        const response = await api.patch('/avatar', fileForm);
        localStorage.setItem('@harvelnotes:avatar', response.data.user.avatar);
        user.avatar = response.data.user.avatar;
      }
      const avataruser = localStorage.getItem('@harvelnotes:avatar');
      const dados = {
        ...user,
        avatar: avataruser,
      };
      await api.put('/updateusers', user);
      localStorage.setItem('@harvelnotes:user', JSON.stringify(dados));
      setData({ user, token: data.token });
      alert('seus dados foi aterados');
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log('nao foi possivel atualizar o perfil ');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('@harvelnotes:token');
    localStorage.removeItem('@harvelnotes:user');
    setData({});
  };

  useEffect(() => {
    const user = localStorage.getItem('@harvelnotes:user');
    const token = localStorage.getItem('@harvelnotes:token');
    if (user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        LoginUser,
        updateUser,
        user: data.user,
        token: data.token,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { Auth, useAuth };
