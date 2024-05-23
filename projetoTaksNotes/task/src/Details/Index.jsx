import { Container, Links, Content } from './style.js';
import Buttons from '../Components/Buttons/Buttons.jsx';
import Cabecalho from '../Components/Header/cabecalho.jsx';
import { Section } from '../Components/Section/Section.jsx';
import { Tags } from '../Components/Tags/Tags.jsx';
import { ButtonText } from '../Components/Buttons/ButtonText.jsx';
export const Details = () => {
  function HandlkeClick() {
    console.log('ola mundo');
  }
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
