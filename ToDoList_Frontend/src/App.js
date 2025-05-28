
import React from 'react';
import { Button, Avatar, Divider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskFlowUI from './components/TrackTask';
import Login from './components/Login';
import Signup from './components/Register';
import AddTask from './components/AddTask';
import AboutUs from './components/Aboutus';
import { useNavigate } from 'react-router-dom';
import  SettingsPage from './components/Settings';
const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<AddTask/>}></Route>
        <Route path="/track" element={<TaskFlowUI/>}></Route>
           <Route path="/aboutus" element={<AboutUs/>}></Route>
           <Route path="/settings" element={<SettingsPage/>}></Route>
      </Routes>
    </Router>
  );
};



function TaskLandingPage () {
 const navigate = useNavigate();
  return (
    
    <div className="task-container">
     
      <header className="task-header">
        <div className="task-logo">
          <img
            src="https://static-00.iconduck.com/assets.00/task-accepted-icon-1024x1024-x9189siz.png"
            alt="logo"
          />
          <span>TaskFlow</span>
        </div>
       <nav className="task-nav">
  <a style={{ cursor: 'pointer' }} onClick={() => navigate('/aboutus')}>Features</a>
  <a style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Tasks</a>
  <a
  style={{ cursor: 'pointer' }}
  onClick={() =>
    document.querySelector('.task-footer')?.scrollIntoView({ behavior: 'smooth' })
  }
>
  Integrations
</a>
<a
  style={{ cursor: 'pointer' }}
  onClick={() =>
    document.querySelector('.task-footer')?.scrollIntoView({ behavior: 'smooth' })
  }
>
  Testimonials
</a>

</nav>

        <div class="task-auth-buttons">
            <div>
      <Button 
        variant="text" 
        className="login-btn" 
        onClick={() => navigate('/login')}
      >
        Login
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        className="signup-btn" 
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </Button>
    </div>
        </div>
      </header>

    
      <main className="task-main">
       
        <section className="task-left">
    
        
          <h1 className="task-title">
            Manage your tasks anytime, anywhere with taskflow
          </h1>
          <p className="task-subtitle">
            TaskFlow is your intelligent & intuitive to-do list designed to boost<br></br> your daily productivity.Collaborate with your team, prioritize tasks <br></br>based  importance.
          </p>
          <br></br>

          <div className="task-tags">
            {["For Teams", "For Individuals", "For Freelancers"].map(label => (
              <Button
                key={label}
                variant="outlined"
                size="small"
                className="tag-button"
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="task-actions">
           <Button 
        variant="contained" 
        color="primary" 
        className="start-btn"
        onClick={() => navigate('/register')}
      >
        Start Free
      </Button>

      <Button 
        variant="outlined" 
        startIcon={<PlayArrowIcon />} 
        className="demo-btn"
        onClick={() => navigate('/aboutus')}
      >
        See Demo
      </Button>
          </div>

          <div className="task-users">
            <div className="task-avatar-container">
              <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/women/65.jpg" />
            </div>
            <span>30k+ users needs task scheduler</span>
          </div>
        </section>

        <section className="task-right">
          <div className="calendar-review-card">
            <img
              src="https://www.quirks.com/storage/attachments/6723af6f04dcf658b804cd77/6723b2d704dcf658b805b372/original/Leadership-orientations-how-to-balance-task-oriented-and-people-oriented-leadership.jpg"
              alt="Calendar"
              className="calendar-image"
            />
            <div className="review-content">
             
              <p className="review-text">
              "The task list is incredibly efficient. I can easily prioritize, break down tasks, and track progress. It’s my go-to tool for productivity."
              </p>
               <div className="review-stars">★★★★★</div>
            </div>
          </div>
        </section>
      </main>
<br></br>
<br></br>
<Divider></Divider>
<footer className="task-footer">
   
  <div className="footer-testimonials">
    <div className="testimonial">
     <center> <Avatar
        src="https://randomuser.me/api/portraits/women/81.jpg"
        alt="User 1"
        className="footer-avatar"
      /></center>
      <p>"TaskFlow has completely changed how I manage my day. It's a game-changer for me!"</p>
     <span class="blue-text">Emma</span>

    </div>
    <div className="testimonial">
      <center><Avatar
        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740"
        alt="User 2"
        className="footer-avatar"
      /></center>
      <p>"My tasks are always organized now. It’s perfect for the long project to  schedule the task."</p>
     <span class="blue-text">John</span>

    </div>
    <div className="testimonial">
      <center><Avatar
        src="https://randomuser.me/api/portraits/women/90.jpg"
        alt="User 3"
        className="footer-avatar"
      /></center>
      <p>"Our team collaboration has improved tremendously since using TaskFlow manager."</p>
      <span class="blue-text">Sarah</span>

    </div>
  </div>
</footer>
<br></br>
<footer className="taskflow-footer">
  <div className="footer-container">
    <div className="footer-about">
      <p>
        <strong>TaskFlow</strong> is dedicated to helping you streamline your productivity. 
        Join our growing community of achievers and take control of your workflow today.
      </p>
    </div>

    <div className="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact Us</a>
    </div>

   
   <div className="footer-social">
  <a href="#" aria-label="Facebook">
    <img src="https://img.icons8.com/material-outlined/24/000000/facebook-new.png" alt="Facebook" />
  </a>
  <a href="#" aria-label="Twitter">
    <img src="https://img.icons8.com/material-outlined/24/000000/twitter.png" alt="Twitter" />
  </a>
  <a href="#" aria-label="Instagram">
    <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new.png" alt="Instagram" />
  </a>
</div>


    <p className="footer-copy">&copy; 2025 TaskFlow. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
  
};

export default App;