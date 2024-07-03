import { Header, Logaut, Profile } from './stylecabecalho.js';
import { RiShutDownLine } from 'react-icons/ri';
import { useAuth } from '../../services/Auth.jsx';
import { api } from '../../services/api.js';
import userInit from '../../assets/useerannimo.jpg';
const Cabecalho = () => {
  const { signOut, user } = useAuth();
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : userInit;
  return (
    <Header>
      <Profile to="/profile">
        <img src={avatarUrl} alt={user.name} />
        <div>
          <span>Bem Vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logaut onClick={signOut}>
        <RiShutDownLine className="log" />
      </Logaut>
    </Header>
  );
};

export default Cabecalho;
