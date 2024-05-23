import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.Colors.Background_700};
  border: none;
  border-radius: 10px;
  padding: 22px;
  margin-right: 16px;
  margin-bottom: 10px;

  > h1 {
    flex: 1;
    text-align: left;
    font-weight: 700;
    font-size: 24px;
    color: ${({ theme }) => theme.Colors.WHITE};
  }

  > footer {
    width: 100%;
    display: flex;
    margin-top: 24px;
  }
`;
/* display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;*/
