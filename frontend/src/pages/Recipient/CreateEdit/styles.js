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

    input {
      text-transform: capitalize;
    }

    .form {
      .name {
        input {
          margin-top: 5px;
          width: 100%;
        }
      }

      .address {
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
        display: flex;
        justify-content: space-between;

        div {
          display: grid;
          margin-right: 5px;
          input {
            margin-top: 5px;
            width: 100%;
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

  @media (max-width: 950px) {
    form {
      .form {
        .address {
          grid-template-columns: repeat(2, 1fr) 12%;
        }
      }
    }
  }

  @media (max-width: 750px) {
    form {
      width: 95%;

      .form {
        .region,
        .address {
          display: block;
          div {
            margin: 0;
          }
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 970px) {
    h2 {
      font-size: 1.8rem;
    }

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
