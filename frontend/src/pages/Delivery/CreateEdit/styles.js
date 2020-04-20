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
    width: 80%;

    .form {
      .name {
        input {
          margin-top: 10px;
          width: 100%;
        }

        margin-top: 10px;
      }

      .infos {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 25px;

        input {
          width: 100%;
          height: 15%;
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
      text-transform: capitalize;

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
    form {
      width: 85%;

      .form .infos {
        display: block;

        > div {
          margin-bottom: 10px;
        }
      }
    }
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
    text-decoration: none;
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
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    transition: all 0.2s ease;

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
