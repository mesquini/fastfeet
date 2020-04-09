import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: '#7019c5';
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  div {
    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      img {
        width: 100%;
        margin-bottom: 30px;
        padding: 15px;
      }

      strong {
        text-align: start;
        margin-bottom: 5px;
      }

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        height: 44px;
        width: 100%;
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
        margin: 0 0 10px;
        font-weight: bold;
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        background: #7154c1;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s ease;

        &:hover {
          background: ${darken(0.03, '#7154c1')};
        }
      }
    }
  }
`;
