import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Card, CardContent, CardActions } from '@mui/material';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    alert(data);

    if (response.ok) {
      window.location.href = "/login";
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 10, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={userData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={userData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1, mb: 2, py: 1.5, fontSize: '1rem' }}
              >
                Sign Up
              </Button>
            </CardActions>
          </Box>
          <Typography align="center">
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Already have an account? Sign In
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
