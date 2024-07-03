import styled from 'styled-components';
import Imgems from '../../assets/cup_coffee_books_156306_3840x2160.jpg';

export const Conteiner = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  @media (max-width: 768px) {
    width: 100;
  }
`;

export const Form = styled.form`
  padding: 0 136px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.Colors.ORANGE};
  }
  > h2 {
    font-size: 24px;
    margin-top: 84px;
    color: ${({ theme }) => theme.Colors.ORANGE};
    margin-bottom: 24px;
  }
  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.Colors.GRAY_100};
  }

  > a {
    margin-top: 3.7rem;
    color: ${({ theme }) => theme.Colors.ORANGE};
  }
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ImagenD = styled.div`
  flex: 1;
  background: url(${Imgems}) no-repeat center center;
  background-size: cover;
  /* Ocultar a imagem em dispositivos móveis */
  @media (max-width: 1000px) {
    display: none;
  }
`;
