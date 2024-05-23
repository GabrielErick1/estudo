import { Container, Avatar, Form } from './profilecss.js';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import Input from '../Buttons/Input.jsx';
import Buttons from '../Buttons/Buttons.jsx';
import { api } from '../../services/api.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../services/Auth.jsx';
import userInit from '../../assets/useerannimo.jpg';
const Profile = () => {
  const { user, updateUser, UploadImage } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [word_password, setWordPassword] = useState('');
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : userInit;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);
  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  };

  const handleUpdate = async () => {
    const user = {
      email,
      name,
      password,
      word_password,
    };
    await updateUser({ user, avatarFile });
  };

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>
      <Form action="atualizar" method="POST">
        <Avatar>
          <img src={avatarUrl ? avatar : avatarUrl} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              onChange={handleChangeAvatar}
              type="file"
              id="avatar"
              name="avatar"
            />
          </label>
        </Avatar>
        <Input
          onChange={handleChange(setName)}
          placeholder="nome"
          type="name"
          value={name}
          icon={FiUser}
        />
        <Input
          onChange={handleChange(setEmail)}
          placeholder="E-mail"
          type="email"
          value={email}
          icon={FiMail}
        />
        <Input
          onChange={handleChange(setPassword)}
          placeholder="senha atual"
          type="password"
          value={password}
          icon={FiLock}
        />
        <Input
          onChange={handleChange(setWordPassword)}
          placeholder="nova senha"
          type="password"
          value={word_password}
          icon={FiLock}
        />
        <Buttons onClick={handleUpdate} title="Salvar" />
      </Form>
    </Container>
  );
};

export default Profile;
