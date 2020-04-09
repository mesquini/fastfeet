import styled from 'styled-components';
import { darken, lighten } from 'polished';

function value(status, font) {
  switch (status) {
    case 'Entregue':
      return font ? '#1F733C' : lighten(0.3, '#1F733C');
    case 'Pendente':
      return font ? '#F2CB05' : lighten(0.3, '#F2CB05');
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
      grid-template-columns: repeat(7, 1fr);
      margin: 20px;
      padding: 20px;
      border-radius: 6px;
      background: ${({ theme }) => theme.background};

      .action {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const Status = styled.li`
  display: flex;
  width: 65%;
  padding: 5px;
  border-radius: 25px;
  background: ${props => value(props.status, false)};
  color: ${props => value(props.status, true)};
  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 5px;
    align-self: center;
  }
`;

export const Buttons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;

  input {
    border-radius: 2px;
    padding: 5px;
    border: 0;
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
