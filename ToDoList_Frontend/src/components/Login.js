// src/Login.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Card,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Email, Lock } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { auth, googleProvider, githubProvider, facebookProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleEmailLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    toast.error("Please enter email and password");
    return;
  }

  try {
    const response = await fetch("https://todo-backend-e98t.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success(`Logged in as ${data.user.email}`, { autoClose: 3000 });

    
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    toast.error(`Login failed: ${error.message}`);
  }
};


 
  const handleSocialLogin = async (providerName) => {
    let provider = null;
    if (providerName === "google") provider = googleProvider;
    else if (providerName === "facebook") provider = facebookProvider;
    else if (providerName === "github") provider = githubProvider;

    if (!provider) {
      toast.error("Unknown provider");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Logged in with ${providerName} as ${user.displayName}`, {
        autoClose: 10000, 
      });
      console.log(`${providerName} user:`, user);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 30000);
    } catch (error) {
      toast.error(`Login with ${providerName} failed: ${error.message}`);
      console.error(error);
    }
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
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <Email style={{ marginRight: "10px" }} />,
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
                  startAdornment: <Lock style={{ marginRight: "10px" }} />,
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
            </Box>
          </form>

          <Typography
            variant="body2"
            align="center"
            style={{ margin: "20px 0", color: "#888" }}
          >
            Or sign in with
          </Typography>

          <div
            className="social-login-logos"
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Avatar
              sx={{ bgcolor: "#db4437", cursor: "pointer" }}
              className="social-icon"
              onClick={() => handleSocialLogin("google")}
            >
              <GoogleIcon />
            </Avatar>
            <Avatar
              sx={{ bgcolor: "#3b5998", cursor: "pointer" }}
              className="social-icon"
              onClick={() => handleSocialLogin("facebook")}
            >
              <FacebookIcon />
            </Avatar>
            <Avatar
              sx={{ bgcolor: "#333", cursor: "pointer" }}
              className="social-icon"
              onClick={() => handleSocialLogin("github")}
            >
              <GitHubIcon />
            </Avatar>
          </div>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            Don't have an account? <a href="/register">Sign up</a>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Login;
