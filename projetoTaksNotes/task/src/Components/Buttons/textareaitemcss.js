import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme, $isNew }) =>
    $isNew ? 'transparent' : theme.Colors.Background_900};
  color: ${({ theme }) => theme.Colors.GRAY_300};
  border: ${({ theme, $isNew }) =>
    $isNew ? `1px dashed ${theme.Colors.GRAY_300}` : 'none'};
  margin-bottom: 8px;
  border-radius: 10px;
  padding-right: 16px;

  > button {
    border: none;
    background: none;
    color: ${({ theme, $isNew }) => ($isNew ? theme.Colors.ORANGE : 'red')};
  }
  > input {
    height: 56px;
    width: 100%;
    padding: 12px;
    color: ${({ theme }) => theme.Colors.WHITE};
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.Colors.GRAY_300};
    }
  }
  @media (max-width: 768px) {
    padding-right: 0;
    width: 100%;
    > input {
      width: 100%;
    }
    > button {
      margin-bottom: 8px; /* Adicionar margem inferior para separar o botão do input */
    }
  }

  @media (min-width: 875px) {
    padding-right: 0;
    width: 100%;
    > input {
      width: 100%;
    }
    > button {
      margin-bottom: 8px;
    }
  }
`;
