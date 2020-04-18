import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { ReactComponent as Sun } from '~/assets/sun.svg';
import { ReactComponent as Moon } from '~/assets/moon.svg';

import { Container, ToggleContainer } from './styles';

import { lightTheme, darkTheme } from '~/themes/theme';
import { darkMode } from '~/store/modules/theme/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Nav, Navbar, Button } from 'react-bootstrap';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const isLight = theme.theme === 'light';

  function changeTheme() {
    const themeChange = theme.theme === 'light' ? 'dark' : 'light';
    const toggleTheme = themeChange === 'light' ? lightTheme : darkTheme;

    dispatch(darkMode(themeChange, toggleTheme));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={theme.theme}
        variant={theme.theme}
      >
        <Navbar.Brand href="/">
          <img
            className="d-inline-block align-top"
            src={logo}
            width="170"
            height="30"
            alt="logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <NavLink
                activeStyle={{ color: theme.toggleTheme.active }}
                to="/deliveries"
              >
                ENCOMENDAS
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                activeStyle={{ color: theme.toggleTheme.active }}
                to="/deliverymanes"
              >
                ENTREGADORES
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                activeStyle={{ color: theme.toggleTheme.active }}
                to="/recipients"
              >
                DESTINATÁRIOS
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                activeStyle={{ color: theme.toggleTheme.active }}
                to="/delivery-problem"
              >
                PROBLEMAS
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <ToggleContainer lightTheme={isLight} onClick={changeTheme}>
                <Sun />
                <Moon />
              </ToggleContainer>
            </Nav.Item>
            <Nav.Item>
              <p>Admin FastFeet</p>
              <Button
                type="button"
                size="sm"
                onClick={handleSignOut}
                variant="danger"
              >
                Sair do sistema
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
