import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;

  > header {
    width: 100vw;
    height: 144px;
    background: ${({ theme }) => theme.Colors.Background_900};
    display: flex;
    align-items: center;
    padding: 0 124px;

    svg {
      color: ${({ theme }) => theme.Colors.GRAY_100};
      font-size: 1.2rem;
    }
  }
`;

export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 0;

  > div:nth-child(4) {
    margin-top: 24px;
  }
`;

export const Avatar = styled.div`
  position: relative;
  margin: -100px auto 32px;
  width: 150px;
  height: 150px;
  > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  > label {
    width: 48px;
    height: 48px;
    background-color: ${({ theme }) => theme.Colors.ORANGE};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 7px;
    right: 7px;
    cursor: pointer;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: ${({ theme }) => theme.Colors.Background_800};
    }
  }
`;
