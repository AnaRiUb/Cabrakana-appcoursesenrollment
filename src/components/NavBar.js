import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // Cambia el tamaño según tu diseño

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" style={{ padding: '16px' }}>PIWIS</Typography>
      <List>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <ListItemText primary="Registrar" />
        </ListItem>
        <ListItem button component={Link} to="/user">
          <ListItemText primary="Información de Usuario" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </>
        )}
        {!isMobile && (
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            className="navbar-title"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
          >
            PIWIS
          </Typography>
        )}
        {!isMobile && (
          <>
            <Button className="navbar-button" component={Link} to="/courses">Cursos</Button>
            <Button className="navbar-button" component={Link} to="/forums">Foros</Button>
            <Button className="navbar-button" component={Link} to="/events">Eventos</Button>
            <Button className="navbar-button" component={Link} to="/login">Login</Button>
            <Button className="navbar-button" component={Link} to="/register">Registrar</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
