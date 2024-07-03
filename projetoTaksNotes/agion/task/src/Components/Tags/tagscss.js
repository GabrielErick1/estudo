import styled from 'styled-components';

export const ConteinerSpan = styled.span`
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: ${({ theme }) => theme.Colors.ORANGE};
  color: ${({ theme }) => theme.Colors.Background_900};
`;
