import { ButtonstText } from './buttonTextcss.js';

export const ButtonText = ({ title, isActive = false, ...rest }) => {
  return (
    <ButtonstText $isactive={isActive} type="button" {...rest}>
      {title}
    </ButtonstText>
  );
};
