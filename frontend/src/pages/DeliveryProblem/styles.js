import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 50px;
`;

export const Content = styled.div`
  h2 {
    margin-bottom: 15px;
  }

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

  @media (max-width: 700px) {
    h2 {
      font-size: 1.35rem;
      font-weight: bold;
      text-align: center;
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15%;

  strong {
    text-align: center;
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
    color: #ddd;

    &:hover {
      color: ${lighten(0.1, '#7159c1')};
    }
  }
`;

export const Options = styled.div`
  position: absolute;
  left: calc(100% - 200px);
  margin-top: 5px;
  background: ${({ theme }) => theme.power};
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - -6px);
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
  width: 35%;

  h2 {
    color: #8c031c;
    border-bottom: 1px solid #000;
    margin-bottom: 35px;
    margin-top: -20px;
  }

  p {
    line-height: 24px;
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
