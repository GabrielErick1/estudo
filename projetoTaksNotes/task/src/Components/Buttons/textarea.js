import styled from 'styled-components';

export const Container = styled.textarea`
  width: 100%;
  height: 150px;
  color: ${({ theme }) => theme.Colors.WHITE};
  background: ${({ theme }) => theme.Colors.Background_900};
  border: none;
  resize: none;
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 16px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.Colors.GRAY_300};
  }
`;
