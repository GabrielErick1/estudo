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
  const deleteNotes = async () => {
    const response = await api.delete(`/deletenotes/${notes.id}`);
    navigate('/');
  };

  return (
    <Container>
      <Cabecalho />
      <main>
        <Content>
          <ButtonText onClick={deleteNotes} title="excluir Notas" />
          <section>
            <h1>{notes.title}</h1>
            <p>{notes.description}</p>
          </section>

          <Section title="Links Ulteis">
            {notes.links?.map((link) => (
              <Links key={link.id}>
                <li>
                  <a href={link.url}>{link.url}</a>
                </li>
              </Links>
            ))}
          </Section>
          <Section title="Marcadores">
            {notes.tags?.map((tgs) => (
              <Tags key={tgs.id} name={tgs.name} />
            ))}
          </Section>
          <Buttons title="voltar" onClick={HandlkeClick} />
        </Content>
      </main>
    </Container>
  );
};
