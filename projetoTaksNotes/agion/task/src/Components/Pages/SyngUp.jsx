import { Conteiner, Form, ImagenD, Span } from './synapcss.js';
import Input from '../Buttons/Input.jsx';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import Buttons from '../Buttons/Buttons.jsx';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ContextUser } from '../../services/PostUser.jsx';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.',
  },
};

const Synap = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { PostUseres } = useContext(ContextUser);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };
  const handleSubmit = async () => {
    if (!name || !password || !email) {
      return alert('Preencha todos os campos');
    }
    const isEmail = types.email.regex.test(email);
    const isPassword = types.password.regex.test(email);
    if (!isEmail && !isPassword) {
      console.log('email ou senha errados');
      return;
    }
    await PostUseres(name, email, password);
  };

  return (
    <Conteiner>
      <ImagenD />
      <Form action="dados" method="POST">
        <h1>Harvel Notes</h1>
        <p>Aplicaçao para salva e gerencia seus links e suas notas</p>

        <h2>Faça seu login</h2>
        <Input
          value={name}
          onChange={handleChange(setName)}
          placeholder="Nome"
          type="name"
          icon={FiUser}
        />
        <Input
          value={email}
          onChange={handleChange(setEmail)}
          placeholder="E-mail"
          type="email"
          icon={FiMail}
        />
        <Input
          value={password}
          onChange={handleChange(setPassword)}
          placeholder="Senha"
          type="Password"
          icon={FiLock}
        />
        <Buttons onClick={handleSubmit} icons={FiLogIn} title="Cadastrar" />
        <Link to="/">Volte Para Login</Link>
      </Form>
    </Conteiner>
  );
};
export default Synap;
