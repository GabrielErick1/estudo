import { ConteinerSc } from './sectioncss.js';

export const Section = ({ title, children }) => {
  return (
    <ConteinerSc>
      <h2>{title}</h2>
      {children}
    </ConteinerSc>
  );
};
