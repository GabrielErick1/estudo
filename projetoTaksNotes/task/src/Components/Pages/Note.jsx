import { Container } from './Notecss.js';
import { Tags } from '../Tags/Tags.jsx';

function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>
      {data.tags && (
        <footer>
          {data.tags.map((tag) => (
            <Tags key={tag.id} name={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  );
}

export default Note;
