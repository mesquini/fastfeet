import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { ReactComponent as Sun } from '~/assets/sun.svg';
import { ReactComponent as Moon } from '~/assets/moon.svg';

import { Container, Content, ToggleContainer } from './styles';

import { lightTheme, darkTheme } from '~/themes/theme';
import { darkMode } from '~/store/modules/theme/actions';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const isLight = theme === 'light';

  function changeTheme() {
    const themeChange = theme === 'light' ? 'dark' : 'light';
    const toggleTheme = themeChange === 'light' ? lightTheme : darkTheme;

    dispatch(darkMode(themeChange, toggleTheme));
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/delivery">EMCOMENDAS</Link>
          <Link to="/deliveryman">ENTREGADORES</Link>
          <Link to="/recipient">DESTINATÁRIOS</Link>
          <Link to="/delivery-problem">PROBLEMAS</Link>
        </nav>
        <aside>
          <ToggleContainer lightTheme={isLight} onClick={changeTheme}>
            <Sun />
            <Moon />
          </ToggleContainer>
          <div>
            <strong>Admin FastFeet</strong>
            <button type="button">sair do sistema</button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
