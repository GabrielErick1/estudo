import styled from 'styled-components';

export const ButtonstText = styled.button`
  background: none;
  color: ${({ theme, $isactive }) =>
    $isactive ? theme.Colors.ORANGE : theme.Colors.GRAY_100};
  border: none;
  font-size: 16x;
`;
