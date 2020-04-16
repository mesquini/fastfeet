import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { ReactComponent as Sun } from '~/assets/sun.svg';
import { ReactComponent as Moon } from '~/assets/moon.svg';

import { Container, Content, ToggleContainer } from './styles';

import { lightTheme, darkTheme } from '~/themes/theme';
import { darkMode } from '~/store/modules/theme/actions';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const isLight = theme.theme === 'light';

  function changeTheme() {
    const themeChange = theme.theme === 'light' ? 'dark' : 'light';
    const toggleTheme = themeChange === 'light' ? lightTheme : darkTheme;

    dispatch(darkMode(themeChange, toggleTheme));
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <NavLink
            to="/deliveries"
            activeStyle={{ color: theme.toggleTheme.active }}
          >
            ENCOMENDAS
          </NavLink>
          <NavLink
            activeStyle={{ color: theme.toggleTheme.active }}
            to="/deliveryman"
          >
            ENTREGADORES
          </NavLink>
          <NavLink
            activeStyle={{ color: theme.toggleTheme.active }}
            to="/recipients"
          >
            DESTINATÁRIOS
          </NavLink>
          <NavLink
            activeStyle={{ color: theme.toggleTheme.active }}
            to="/delivery-problem"
          >
            PROBLEMAS
          </NavLink>
        </nav>
        <aside>
          <ToggleContainer lightTheme={isLight} onClick={changeTheme}>
            <Sun />
            <Moon />
          </ToggleContainer>
          <div>
            <p>Admin FastFeet</p>
            <button type="button">Sair do sistema</button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
