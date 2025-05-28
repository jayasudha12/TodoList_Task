import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Card,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Email, Lock } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import '../styles/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://todolist-project-akxp.onrender.com/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Assuming the token is returned as data.token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toast.success(`Welcome back, ${data.displayName || 'User'}`);
      window.location.href = '/dashboard';
    } else {
      const errorData = await response.json();
      toast.error(`Error: ${errorData.message}`);
    }
  } catch (error) {
    toast.error('Login failed. Please try again.');
  }
};


  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />
      <Card className="login-card" elevation={10}>
        <div className="welcome-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
            alt="logo"
            className="logo"
          />
          <Typography variant="h4" gutterBottom>
            Welcome Back to TaskFlow
          </Typography>
          <Typography variant="body1" className="welcome-text">
            Organize your tasks, track your progress, and stay productive every day!
          </Typography>
        </div>

        <div className="form-section">
          <div className="form-header">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoPSHYfoASMsbeyzBDI-qdwqVUMTW9K8T8eYuYxMQrXxtV3JRjquOeizm90gSHYHQiPk&usqp=CAU"
              alt="login icon"
              className="form-logo"
            />
            <Typography variant="h5" color="primary">
              Sign in to your account
            </Typography>
          </div>

          <form onSubmit={handleEmailLogin} noValidate>
            <Box display="flex" flexDirection="column" gap={2}></Box>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: <Email style={{ marginRight: '10px' }} />,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: <Lock style={{ marginRight: '10px' }} />,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className="login-button"
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            style={{ margin: '20px 0', color: '#888' }}
          >
            Or sign in with
          </Typography>

          <div className="social-login-logos">
            <Avatar
              sx={{ bgcolor: '#db4437' }}
              className="social-icon"
              onClick={() => handleSocialLogin('google')}
            >
              <GoogleIcon />
            </Avatar>
            <Avatar
              sx={{ bgcolor: '#3b5998' }}
              className="social-icon"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FacebookIcon />
            </Avatar>
            <Avatar
              sx={{ bgcolor: '#333' }}
              className="social-icon"
              onClick={() => handleSocialLogin('github')}
            >
              <GitHubIcon />
            </Avatar>
          </div>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px' }}
          >
            Don't have an account? <a href="/register">Sign up</a>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Login;
