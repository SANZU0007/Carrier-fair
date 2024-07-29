import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

function Home({ children }) {
  let navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#1877f2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            REAL ESTATE
          </Typography>
         
          <Button color="inherit"  variant="outlined onClick={() => navigate('/all-property')}>
            View all
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: 1, mr: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default Home;
