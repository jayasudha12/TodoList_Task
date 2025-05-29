import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountCircle, Lock, Email } from '@mui/icons-material';
import '../styles/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!displayName) {
      newErrors.displayName = 'Full Name is required.';
      valid = false;
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email.';
      valid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors above.');
      return;
    }

    try {
      const response = await axios.post('https://todo-backend-e98t.onrender.com/auth/register', {
        email,
        password,
        displayName,
      });

      toast.success(`Welcome, ${response.data.displayName}`);
      setEmail('');
      setPassword('');
      setDisplayName('');
      setTermsAccepted(false);
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <ToastContainer />
      <div className="left-panel">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
          alt="logo"
          className="logo"
        />
        <h2>Welcome to TaskFlow</h2>
        <p>Organize tasks, track progress, and stay focused with ease.</p>
      </div>

      <div className="right-panel">
        <div className="form-box">
          {/* Header with logo and title in one line */}
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={3}>
            <img
              src="https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg"
              alt="Register"
              style={{ width: 40, height: 40 }}
            />
            <Typography variant="h5" color="primary" fontWeight={600}>
              Create Your Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                error={!!errors.displayName}
                helperText={errors.displayName}
                InputProps={{
                  startAdornment: <AccountCircle style={{ marginRight: '10px' }} />,
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <Email style={{ marginRight: '10px' }} />,
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <Lock style={{ marginRight: '10px' }} />,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the <a href="#">Terms of Service</a>
                  </Typography>
                }
              />
              {errors.terms && (
                <Typography color="error" variant="body2">
                  {errors.terms}
                </Typography>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className="signup-button"
              >
                Sign Up
              </Button>
              <Typography variant="body2" align="center" mt={2}>
                Already have an account? <a href="/login">Login</a>
              </Typography>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
