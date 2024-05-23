import { ButtonText } from '../Buttons/ButtonText.jsx';
import Cabecalho from '../Header/cabecalho.jsx';
import { useAuth } from '../../services/Auth.jsx';
import {
  ContainerHm,
  Brand,
  Menu,
  Search,
  Content,
  NewNot,
} from './homecss.js';
import { FiPlus, FiSearch } from 'react-icons/fi';
import Input from '../Buttons/Input.jsx';
import { Section } from '../Section/Section.jsx';
import Note from './Note.jsx';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagsSelectd, setTagsSelectd] = useState([]);
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const tegSelected = (isSelectdTag) => {
    if (isSelectdTag === 'todos') {
      return setTagsSelectd([]);
    }
    const verifTagSelected = tagsSelectd.includes(isSelectdTag);
    if (verifTagSelected) {
      const newTags = tagsSelectd.filter((tag) => tag !== isSelectdTag);
      setTagsSelectd(newTags);
    } else {
      setTagsSelectd((state) => [...state, isSelectdTag]);
    }
  };
  useEffect(() => {
    const valueTags = tagsSelectd.join(', ');
    const handleSearch = async () => {
      const response = await api.get('/shownotes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          title: search,
          tags: valueTags,
        },
      });
      setNotes(response.data.notesWhite);
    };
    handleSearch();
  }, [tagsSelectd, search]);

  useEffect(() => {
    const GetNotes = async () => {
      const response = await api.get('/tags', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data);
    };

    GetNotes();
  }, []);

  const handleDetail = async (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <ContainerHm>
      <Brand>
        <h1>Harvel Notes</h1>
      </Brand>
      <Cabecalho />
      <Menu>
        <li>
          <ButtonText
            onClick={() => tegSelected('todos')}
            isActive={tagsSelectd.length === 0}
            title="Todos"
          />
        </li>

        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              <ButtonText
                onClick={() => tegSelected(tag.name)}
                isActive={tagsSelectd.includes(tag.name)}
                title={tag.name}
              />
            </li>
          ))}
      </Menu>
      <Search>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          icon={FiSearch}
          placeholder="busca pelo navegador"
        />
      </Search>
      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetail(note.id)}
            />
          ))}
        </Section>
      </Content>
      <NewNot to="/cadastrarnotas">
        <FiPlus /> criar notas
      </NewNot>
    </ContainerHm>
  );
};
