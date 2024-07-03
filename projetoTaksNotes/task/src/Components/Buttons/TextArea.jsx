import { Container } from './textarea.js';

const TextArea = ({ value, ...rest }) => {
  return <Container {...rest}>{value}</Container>;
};

export default TextArea;
