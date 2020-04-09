import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};

  nav {
    display: flex;
    align-items: center;

    img {
      width: 20%;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      margin-right: 15px;

      &:hover {
        color: ${lighten(0.1, '#7159c1')};
      }
    }
  }

  aside {
    display: flex;
    justify-items: flex-end;

    div {
      text-align: right;
      margin-right: 10px;

      strong {
        display: block;
        color: ${({ theme }) => theme};
        margin-bottom: 5px;
      }

      button {
        border: 0;
        background: none;
        display: block;
        margin-top: 2px;
        font-size: 14px;
        color: red;
        transition: color 0.2s ease;

        &:hover {
          color: #7154c1;
        }
      }
    }
  }
`;

export const ToggleContainer = styled.button`
  display: flex;
  position: relative;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 5rem;
  height: 2.5rem;
  /* margin: 0 auto; */
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.2rem;
  overflow: hidden;
  margin-right: 20px;

  svg {
    width: 2rem;
    height: auto;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;
