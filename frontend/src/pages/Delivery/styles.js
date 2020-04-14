import styled from 'styled-components';
import { darken, lighten } from 'polished';

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
      grid-template-columns: 80px repeat(7, 1fr);
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
