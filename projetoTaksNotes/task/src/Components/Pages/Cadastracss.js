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
    padding: 20px; /* Adicionando padding para melhor espaçamento do conteúdo */
  }
  .barra {
    height: 110px;
    overflow-y: auto; /* Barra de rolagem se necessário */
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
  .tags {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dois blocos por linha */
    grid-gap: 10px; /* Espaçamento entre os blocos */
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
  }
`;

export const Form = styled.form`
  width: 40%;
  margin: 20px auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px; /* Reduzindo a margem inferior para melhor espaçamento */
    > a {
      font-size: 20px;
      color: ${({ theme }) => theme.Colors.GRAY_100};
    }
  }

  @media (max-width: 769px) {
    width: 80%;
    .tags {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`;
