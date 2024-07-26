import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function Home({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  let navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button onClick={() => navigate('/all-property')}>
        <ListItem>
    <RemoveRedEyeIcon/>
    View All 
  </ListItem>
        </ListItem>

     
        <Divider />

        <ListItem button onClick={logout}>
  <ListItem>
    <LogoutIcon />
    Logout
  </ListItem>

</ListItem>

       
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#1877f2', mb: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            REAL ESTATE
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button

              variant='outlined'
              color="inherit"
              onClick={() => navigate('/all-property')}
              sx={{ mr: 2 }}
            >
              View all
            </Button>
           
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#0d47a1',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerItems}
      </Drawer>
      <Box sx={{ padding: '20px' }}>
        {children}
      </Box>
    </div>
  );
}

export default Home;

