import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Grid,
  IconButton,
  Container,
  Chip
} from "@mui/material";
import { blue } from "@mui/material/colors";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import LockIcon from "@mui/icons-material/Lock";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { blueGrey } from "@mui/material/colors";

const AboutUs = () => {
  const [quizAnswers, setQuizAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [quizScore, setQuizScore] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
     "What is the primary benefit of using a to-do list daily?",
  "What strategy helps in prioritizing tasks effectively?",
  "How can you ensure consistent productivity throughout the week?",
  "What method can reduce procrastination in task management?",
  "What should you track to maintain a balanced workflow?"
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    if (quizAnswers.question1.toLowerCase() === "stocks") score++;
    if (quizAnswers.question2.toLowerCase() === "diversify") score++;
    if (quizAnswers.question3.toLowerCase() === "compounding") score++;
    if (quizAnswers.question4.toLowerCase() === "risk management") score++;
    if (quizAnswers.question5.toLowerCase() === "portfolio") score++;

    setQuizScore(score);
    setShowNotification(true);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleQuizChange = (event) => {
    setQuizAnswers({ ...quizAnswers, [`question${activeStep + 1}`]: event.target.value });
  };

  const openQuizModal = () => setOpenQuiz(true);
  const closeQuizModal = () => setOpenQuiz(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: 3 }}>
      <Box sx={{ textAlign: "center", mt: 10, maxWidth: "900px", margin: "auto" }}>
       <Typography variant="h5" color="black" sx={{ mt: 6 }}>
  Stay organized and boost productivity with your personalized To-Do List. Manage tasks efficiently and achieve your daily goals with ease.
</Typography>

      </Box>

      {/* Video Embedding */}
      <Box sx={{ marginTop: 6, textAlign: "center" }}>
        {/* <Typography variant="h5" color={blue[700]} fontWeight="bold">
          Learn More About Stock Market Investments
        </Typography> */}
        <Box sx={{ mt: 4 }}>
          <iframe
            width="1000"
            height="505"
            src="https://www.youtube.com/embed/52d7I9NJL8A?si=eeuapa67SJT1gg2Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>

      {/* Take Quiz Button */}
      <Box sx={{ textAlign: "center", marginTop: 6 }}>
        <Button variant="contained" color="primary" onClick={openQuizModal}>
          Take the Knowledge Investment Quiz
        </Button>
      </Box>

      {/* Modal for Quiz */}
      <Dialog open={openQuiz} onClose={closeQuizModal} maxWidth="sm" fullWidth>
        <DialogTitle>Knowledge Quiz</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ paddingTop: 4 }}>
            {/* Step Content */}
            {activeStep === 0 && (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <RadioGroup
        value={quizAnswers.question1}
        onChange={handleQuizChange}
      >
        <FormControlLabel
          value="better organization"
          control={<Radio />}
          label="Better organization"
        />
        <FormControlLabel
          value="multitasking"
          control={<Radio />}
          label="Multitasking"
        />
        <FormControlLabel
          value="creativity boost"
          control={<Radio />}
          label="Creativity boost"
        />
      </RadioGroup>
    </CardContent>
  </Card>
)}

{activeStep === 1 && (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <RadioGroup
        value={quizAnswers.question2}
        onChange={handleQuizChange}
      >
        <FormControlLabel
          value="Eisenhower matrix"
          control={<Radio />}
          label="Eisenhower Matrix"
        />
        <FormControlLabel
          value="random selection"
          control={<Radio />}
          label="Random Selection"
        />
        <FormControlLabel
          value="do the easiest first"
          control={<Radio />}
          label="Do the easiest task first"
        />
      </RadioGroup>
    </CardContent>
  </Card>
)}

{activeStep === 2 && (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <RadioGroup
        value={quizAnswers.question3}
        onChange={handleQuizChange}
      >
        <FormControlLabel
          value="set daily goals"
          control={<Radio />}
          label="Set daily goals"
        />
        <FormControlLabel
          value="work overtime"
          control={<Radio />}
          label="Work overtime"
        />
        <FormControlLabel
          value="ignore breaks"
          control={<Radio />}
          label="Ignore breaks"
        />
      </RadioGroup>
    </CardContent>
  </Card>
)}

{activeStep === 3 && (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <RadioGroup
        value={quizAnswers.question4}
        onChange={handleQuizChange}
      >
        <FormControlLabel
          value="pomodoro technique"
          control={<Radio />}
          label="Pomodoro Technique"
        />
        <FormControlLabel
          value="last minute rush"
          control={<Radio />}
          label="Last-minute rush"
        />
        <FormControlLabel
          value="avoid planning"
          control={<Radio />}
          label="Avoid planning"
        />
      </RadioGroup>
    </CardContent>
  </Card>
)}

{activeStep === 4 && (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <RadioGroup
        value={quizAnswers.question5}
        onChange={handleQuizChange}
      >
        <FormControlLabel
          value="task completion and time spent"
          control={<Radio />}
          label="Task completion and time spent"
        />
        <FormControlLabel
          value="number of breaks"
          control={<Radio />}
          label="Number of breaks"
        />
        <FormControlLabel
          value="workload only"
          control={<Radio />}
          label="Workload only"
        />
      </RadioGroup>
    </CardContent>
  </Card>
)}

         

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button variant="contained" onClick={handleBack} disabled={activeStep === 0} sx={{ marginRight: 2 }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext} sx={{ marginRight: 2 }}>
                Next
              </Button>
              {activeStep === steps.length - 1 && (
                <Button variant="contained" onClick={handleQuizSubmit}>
                  Submit Quiz
                </Button>
              )}
            </Box>
          </Box>

          {showNotification && (
            <Alert sx={{ marginTop: 2 }} severity={quizScore === 5 ? "success" : "error"}>
              {quizScore === 5
                ? "Congratulations! You answered all questions correctly."
                : `You got ${quizScore} out of 5 correct.`}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeQuizModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Section: Features */}
      <Grid container spacing={4} sx={{ marginTop: 4, justifyContent: "center" }}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
            <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
              <FastRewindIcon sx={{ fontSize: 40, color: blue[500] }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
            Seamless Task Management
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }}>
             Easily add, edit, and categorize tasks. Integrates with your <br></br>calendar and reminders to streamline your schedule and boost efficiency.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
          <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
  <LockIcon sx={{ fontSize: 40, color: blue[500] }} />
</IconButton>
<Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
    Stay Focused and Secure
</Typography>
<Typography color="textSecondary" sx={{ mt: 1 }}>
 With cloud sync and data backup, your tasks are always 
 <br></br>safe and accessible from anywhere, helping you stay focused on what matters.
</Typography>

          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
            <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
              <IntegrationInstructionsIcon sx={{ fontSize: 40, color: blue[500] }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
     Organize Your Day with Ease
</Typography>
<Typography color="textSecondary" sx={{ mt: 1 }}>
 "Simple, intuitive, and incredibly useful. It 
 <br></br>helps me balance my personal and work life effectively."
</Typography>

          </Box>
        </Grid>
      </Grid>

      {/* What People Say Section */}
      <Box sx={{ marginTop: 6, textAlign: "center" }}>
        <Typography variant="h5" color={blue[700]} fontWeight="bold">
          What do people say?
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 3, justifyContent: "center" }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 3, backgroundColor: "#ffffff", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" color={blue[500]}>
                John Doe
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                "This to-do list app keeps me organized every day
                .<br></br> I no longer forget important tasks!"
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 3, backgroundColor: "#ffffff", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" color={blue[500]}>
                Emily Smith
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                "Simple, intuitive, and incredibly useful. <br></br>It helps me balance my personal and work life effectively."
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", mt: 4, padding: 2, backgroundColor: "#1e40af", color: "white" }}>
        <Typography variant="body2">© 2025 TaskFlow Website</Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;  
