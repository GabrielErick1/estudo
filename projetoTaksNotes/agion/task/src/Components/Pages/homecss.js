import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const ContainerHm = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 105px 128px auto 64px;
  grid-template-areas:
    'brand header'
    'menu search'
    'menu content'
    'newnot content';
  background: ${({ theme }) => theme.Colors.Background_800};
`;

export const Brand = styled.div`
  grid-area: brand;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.Colors.Background_700};
  background-color: ${({ theme }) => theme.Colors.Background_900};
  > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.Colors.ORANGE};
  }
`;
export const Menu = styled.ul`
  grid-area: menu;
  text-align: center;
  background-color: ${({ theme }) => theme.Colors.Background_900};
  padding-top: 64px;
  > li {
    margin-bottom: 24px;
  }
  overflow-y: auto; /* Barra de rolagem se necessário */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
`;
export const Search = styled.div`
  grid-area: search;
  padding: 64px 64px 0;
  background: ${({ theme }) => theme.Colors.Background_800};
`;
export const Content = styled.div`
  grid-area: content;
  background: ${({ theme }) => theme.Colors.Background_800};
  padding: 0 64px;
  overflow-y: auto; /* Barra de rolagem se necessário */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
`;
export const NewNot = styled(Link)`
  grid-area: newnot;
  display: flex;
  background-color: ${({ theme }) => theme.Colors.ORANGE};
  color: ${({ theme }) => theme.Colors.Background_900};
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 8px;
  }
`;
