import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 50px;
`;

export const Content = styled.div`
  div {
    .header {
      font-weight: bold;
      background: none;
      margin-bottom: -30px;

      .action {
        display: flex;
        justify-content: flex-end;
      }
    }

    ul {
      display: grid;
      grid-template-columns: 180px repeat(4, 1fr);
      margin: 20px;
      padding: 20px;
      border-radius: 6px;
      background: ${({ theme }) => theme.background};

      .deliveryman {
        display: flex;
        div {
          margin-top: -4px;
        }
      }

      .action {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;

  div {
    position: relative;
    padding: 0 0 0 20px;
    margin: 0 20px;

    input {
      height: 20px;
      border-radius: 4px;
      padding: 15px;
      border: 1px solid #fff;
      padding-left: 30px;
    }
    svg {
      position: absolute;
      bottom: 10px;
      left: 25px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  a {
    background: #7156c1;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;

    &:hover {
      background: ${darken(0.1, '#7156c1')};
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15%;

  strong {
    font-size: 24px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

export const ContainerAction = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;

  svg {
    color: #7159c1;

    &:hover {
      color: ${lighten(0.1, '#7159c1')};
    }
  }
`;

export const Options = styled.div`
  position: absolute;
  width: 125px;
  margin-left: -52px;
  background: ${({ theme }) => theme.power};
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -10px;
    height: 0;
    width: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.power};
  }

  button {
    margin-top: 5px;
    border: 0;
    background: none;
    width: 100%;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 15px;
    line-height: 24px;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid ${({ theme }) => theme.text};
    margin-bottom: 5px;

    svg {
      margin-right: 8px;
    }
  }
`;

export const ModalLayout = styled.div`
  background: #ddd;
  border-radius: 8px;
  padding: 50px;
  color: #000;

  h2 {
    color: #8c031c;
    border-bottom: 1px solid #000;
    margin-bottom: 35px;
    margin-top: -20px;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;

    button {
      border: 0;
      border-radius: 6px;
      padding: 5px;

      &:hover {
        background: #8c031c;
        color: #fff;
      }
    }
  }
`;
