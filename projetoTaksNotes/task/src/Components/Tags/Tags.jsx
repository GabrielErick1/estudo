import { ConteinerSpan } from './tagscss';

export const Tags = ({ name, ...rest }) => {
  return <ConteinerSpan {...rest}>{name}</ConteinerSpan>;
};
