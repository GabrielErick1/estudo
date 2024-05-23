import styled from 'styled-components';

export const ConteinerSc = styled.section`
  margin: 30px 0;

  > h2 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.Colors.Background_700};
    padding-bottom: 16px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.Colors.GRAY_100};
    font-size: 20px;
    font-weight: 400;
  }
`;
