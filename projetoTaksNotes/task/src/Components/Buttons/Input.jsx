import { Conteiners } from './Inputcss.js';

function Input({ icon: Icon, ...rest }) {
  return (
    <Conteiners>
      {Icon && <Icon size="20" />}
      <input {...rest} />
    </Conteiners>
  );
}

export default Input;
