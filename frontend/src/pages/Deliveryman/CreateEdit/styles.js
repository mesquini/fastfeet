import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  width: 100%;
  padding: 30px;

  form {
    width: 70%;

    input[name='name'] {
      text-transform: capitalize;
    }

    .form {
      .sc-fzoKki {
        display: flex;
        justify-content: center;
      }
      .name {
        input {
          margin-top: 5px;
          width: 100%;
        }
      }

      .caczKD {
        text-align: center;
      }

      .andress {
        display: grid;
        grid-template-columns: 15% 75% 10%;

        div {
          display: grid;
          margin-right: 5px;
          input {
            margin-top: 5px;
          }
          input[name='cep'] {
            width: 100%;
          }
          input[name='number'] {
            width: 100%;
          }
        }
      }

      .region {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        div {
          display: grid;
          margin-right: 5px;
          input {
            margin-top: 5px;
          }
        }
      }
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      height: 40px;
      color: #333;
      border-radius: 4px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    span {
      color: red;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
      line-height: 14px;
    }
  }

  @media (max-width: 970px) {
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 1.35rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    form {
      width: 100%;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 970px) {
    display: grid;
    justify-content: center;
  }
`;

export const Buttons = styled.div`
  display: flex;

  svg {
    margin-right: 5px;
  }

  button {
    background: #7156c1;
  }

  a {
    background: gray;
    margin-right: 15px;
  }

  a,
  button {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;

    &:hover {
      background: ${darken(0.1, '#7156c1')};
    }
  }

  @media (max-width: 970px) {
    justify-content: center;
    margin-top: 20px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
