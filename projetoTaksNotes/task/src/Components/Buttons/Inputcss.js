import styled from 'styled-components';

export const Conteiners = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.Colors.Background_900};
  color: ${({ theme }) => theme.Colors.GRAY_300};
  margin-bottom: 8px;
  border-radius: 10px;

  > input {
    height: 45px;
    width: 100%;
    padding: 12px;
    color: ${({ theme }) => theme.Colors.WHITE};
    background: transparent;
    border: 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.Colors.GRAY_300};
    }
  }

  > svg {
    margin-left: 16px;
  }
`;
