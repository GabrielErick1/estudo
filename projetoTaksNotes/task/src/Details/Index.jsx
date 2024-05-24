import { Container, Links, Content } from './style.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Buttons from '../Components/Buttons/Buttons.jsx';
import Cabecalho from '../Components/Header/cabecalho.jsx';
import { Section } from '../Components/Section/Section.jsx';
import { Tags } from '../Components/Tags/Tags.jsx';
import { ButtonText } from '../Components/Buttons/ButtonText.jsx';
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
export const Details = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  function HandlkeClick() {
    navigate('/');
  }
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await api.get(`/notes/${id}`);
      setNotes(response.data);
    };
    fetchNotes();
  }, [id]);
  console.log(notes);
  return (
    <Container>
      <Cabecalho />
      <main>
        <Content>
          <ButtonText title="excluir Notas" />

          <h1>sobre o texto </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui hic
            quaerat fugiat doloribus animi error nihil dignissimos? Earum,
            laudantium temporibus vitae unde sapiente blanditiis atque veniam.
            Itaque sed saepe ipsam!
          </p>

          <Section title="Links Ulteis">
            <Links>
              <li>
                <a href="#">link1</a>
              </li>
              <li>
                <a href="#">link2</a>
              </li>
            </Links>
          </Section>
          <Section title="Marcadores">
            <Tags name="aaaaa" />
            <Tags name="bbbb" />
          </Section>
          <Buttons title="voltar" onClick={HandlkeClick} />
        </Content>
      </main>
    </Container>
  );
};
