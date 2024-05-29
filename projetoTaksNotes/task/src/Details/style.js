import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas: 'header' 'content';
  > main {
    grid-area: content;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
  > section {
    word-break: break-word;
  }
`;

export const Links = styled.ul`
  list-style: none;
  > li {
    margin-top: 12px;
    a {
      color: ${({ theme }) => theme.Colors.WHITE};
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
    margin: 0 50px;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    paddin-top: 64px;
    text-align: justify;
    margin: 16px 50px;
  }

  > p {
    font-size: 16px;
    margin: 0 50px;
    text-align: justify;
  }
`;
