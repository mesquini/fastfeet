import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
`;

export const Content = styled.div`
  .table td,
  .table th tbody {
    padding: 1.5rem;
  }

  div {
    border-radius: 8px;

    table {
      tr {
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};

        .deliveryman {
          display: flex;
          justify-content: center;
          div {
            border-radius: 50%;
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 1.35rem;
      font-weight: bold;
      text-align: center;
    }
  }
`;

export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

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

  @media (max-width: 700px) {
    display: grid;
    margin: 25px 0 25px;
    justify-content: center;

    div {
      margin: 0;
      padding: 0;

      svg {
        left: 6px;
        top: 6px;
      }
    }

    a {
      text-align: center;
      margin-top: 10px;
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
  background: ${({ theme }) => theme.power};
  left: calc(100% - 150px);
  margin-top: 5px;
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

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
