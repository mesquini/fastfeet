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
  left: calc(100% - 70px);
  top: calc(100% + 10px);
  background: rgba(0, 0, 0, 1);
  border-radius: 4px;
  padding: 20px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    height: 0;
    width: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 1);
  }
  a {
    padding: 0 15px;
    line-height: 18px;
    max-height: 260px;
    color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

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
