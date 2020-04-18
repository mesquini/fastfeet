import styled from 'styled-components';
import { darken, lighten } from 'polished';

import 'bootstrap/dist/css/bootstrap.min.css';

function value(status, font) {
  switch (status) {
    case 'Entregue':
      return font ? '#1F733C' : lighten(0.3, '#1F733C');
    case 'Pendente':
      return font ? '#F2A413' : lighten(0.3, '#F2A413');
    case 'Retirada':
      return font ? '#239EFF' : lighten(0.3, '#239EFF');
    case 'Cancelado':
      return font ? '#FF0F29' : lighten(0.3, '#FF0F29');

    default:
      return '#eee';
  }
}

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
          align-items: center;
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

export const Status = styled.li`
  display: flex;
  padding: 5px;
  border-radius: 25px;
  background: ${props => value(props.status, false)};
  color: ${props => value(props.status, true)};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  justify-content: center;

  svg {
    margin-right: 5px;
    align-self: center;
  }
`;

export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

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
      top: 7px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  a {
    background: #7156c1;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;

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
  margin-left: -15px;
  margin-top: 10px;
  background: ${({ theme }) => theme.power};
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(40% - -5px);
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

  @media (max-width: 1000px) {
  }
`;

export const ModalLayout = styled.div`
  background: #ddd;
  border-radius: 8px;
  padding: 50px;
  color: #000;
`;

export const Delete = styled.div`
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

export const Infos = styled.div`
  h5 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  p {
    line-height: 24px;
  }

  .adress,
  .date {
    border-bottom: 1px solid #000;
    padding-bottom: 5px;
  }

  .signature {
    display: grid;
    img {
      width: 100%;
      height: 80px;
    }
  }

  .signature,
  .date {
    padding-top: 5px;
    h5 {
      margin-top: 5px;
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
