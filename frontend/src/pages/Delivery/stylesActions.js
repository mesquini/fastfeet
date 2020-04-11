import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  /* position: absolute; */
/*
  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
      }
    `} */
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
  left: calc(100% - 75px);
  top: calc(50% + 12px);
  background: ${({ theme }) => theme.power};
  border-radius: 4px;
  padding: 20px 5px;
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

  a {
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

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 3px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        margin-left: 1px;
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;
