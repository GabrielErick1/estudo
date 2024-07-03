import { Conteiner, Form, ImagenD } from './logincss.js';
import Input from '../Buttons/Input.jsx';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Buttons from '../Buttons/Buttons.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../services/Auth.jsx';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { LoginUser } = useAuth();

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };
  const HandleClick = async () => {
    try {
      if (!email || !password) {
        return alert('Preencha todos os campos');
      }
      await LoginUser({ email, password });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Conteiner>
      <Form action="logar" method="GET">
        <h1>Harvel Notes</h1>
        <p>Aplicaçao para salva e gerencia seus links e suas notas</p>
        <h2>Faça seu login</h2>
        <Input
          onChange={handleChange(setEmail)}
          placeholder="E-mail"
          type="email"
          icon={FiMail}
        />
        <Input
          onChange={handleChange(setPassword)}
          placeholder="Senha"
          type="Password"
          icon={FiLock}
        />
        <Buttons onClick={HandleClick} icons={FiLogIn} title="Logar" />
        <Link to="/cadastro">Criar Conta</Link>
      </Form>
      <ImagenD></ImagenD>
    </Conteiner>
  );
};
export default Login;
