import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Card, CardContent, CardActions } from '@mui/material';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Login Response Data:", data);

      if (response.ok && data.token) {
        alert('User Logged In');
        window.localStorage.setItem('token', data.token);
        window.location.href = "/";
      } else {
        alert(data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
      <Card sx={{ mt: 10, boxShadow: 6, borderRadius: 2, overflow: 'hidden' }}>
        <CardContent sx={{ bgcolor: '#ffffff', p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userData.password}
              onChange={handleChange}
            />
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#115293',
                  },
                }}
              >
                Sign In
              </Button>
            </CardActions>
          </Box>
          <Typography align="center" sx={{ mt: 2 }}>
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Don't have an account? Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
