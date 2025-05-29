import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Chip, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, InputAdornment, LinearProgress, TextField, Typography, IconButton, Avatar,
  List, ListItem, ListItemIcon, ListItemText, Drawer, Tooltip, Divider, Menu, MenuItem
} from '@mui/material';
import {
  Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon,
  ExitToApp as ExitToAppIcon, Dashboard as DashboardIcon, TrackChanges as TrackChangesIcon,
  Info as InfoIcon, Settings as SettingsIcon, MoreVert as MoreVertIcon
} from '@mui/icons-material';
import axios from 'axios';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const statusColors = {
  'Open': 'default',
  'In Progress': 'primary',
  'Completed': 'success',
};

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [dialogMode, setDialogMode] = useState('add');
  const [currentTask, setCurrentTask] = useState({
    title: '', description: '', progress: 0, dueDate: '', status: 'To Do', completed: false
  });
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTitleInput, setDeleteTitleInput] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTaskId, setMenuTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('https://todolist-project-akxp.onrender.com/api/tasks');
    setTasks(res.data);
  };

  const handleDialogOpen = (mode, task = null) => {
    setDialogMode(mode);
    setCurrentTask(task ? { ...task } : {
      title: '', description: '', progress: 0, dueDate: '', status: 'Open', completed: false
    });
    setOpenTaskDialog(true);
    handleMenuClose(); 
  };

  const handleDialogClose = () => setOpenTaskDialog(false);

  const handleTaskSave = async () => {
    if (dialogMode === 'add') {
      const res = await axios.post('https://todolist-project-akxp.onrender.com/api/tasks', currentTask);
      setTasks([...tasks, res.data]);
    } else {
      const res = await axios.put(`https://todolist-project-akxp.onrender.com/api/tasks/${currentTask._id}`, currentTask);
      setTasks(tasks.map(t => (t._id === currentTask._id ? res.data : t)));
    }
    handleDialogClose();
  };

  const handleDeleteConfirm = async () => {
    if (deleteTitleInput === taskToDelete.title) {
      await axios.delete(`https://todolist-project-akxp.onrender.com/api/tasks/${taskToDelete._id}`);
      setTasks(tasks.filter(t => t._id !== taskToDelete._id));
      setOpenDeleteDialog(false);
      setDeleteTitleInput('');
      handleMenuClose();
    }
  };

  const toggleComplete = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      progress: !task.completed ? 100 : 0,
      status: !task.completed ? 'Completed' : 'Open'
    };
    const res = await axios.put(`https://todolist-project-akxp.onrender.com/api/tasks/${task._id}`, updatedTask);
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setMenuTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTaskId(null);
  };

    const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>

     
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#283593',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            pt: 4,
            pb: 0,
          }
        }}
      >
        <Box
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            mb: 3
          }}
        >
          <Avatar src="https://static-00.iconduck.com/assets.00/task-accepted-icon-1024x1024-x9189siz.png"
            sx={{ bgcolor: 'white', color: '#283593' }} />
          <Typography variant="h6" fontWeight="bold" whiteSpace="nowrap">
            TaskFlow
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: '#5c6bc0' }}/>

       <Box sx={{ flexGrow: 2 }}>
  <List>
    {[
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Track Progress', icon: <TrackChangesIcon />, path: '/track' },
      { text: 'About Us', icon: <InfoIcon />, path: '/aboutus' },
      { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ].map(({ text, icon, path }) => (
      <ListItem button key={text} onClick={() => navigate(path)}>
        <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
</Box>


        <Divider sx={{ bgcolor: '#5c6bc0' }} />

<List>
  <ListItem button onClick={() => navigate('/')}>
    <ListItemIcon sx={{ color: '#fff' }}>
      <ExitToAppIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
</List>

      </Drawer>

      
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f4f6f8', minHeight: '80vh' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, justifyContent: 'center' }}>
          <Avatar src="https://www.freeiconspng.com/thumbs/dashboard-icon/dashboard-icon-3.png"
            sx={{ bgcolor: 'white', color: '#283593', width: 48, height: 48 }} />
          <Typography variant="h4" fontWeight="bold">
            ToDoList Dashboard
          </Typography>
        </Box>

      
        <Typography
          variant="subtitle1"
          color="textSecondary"
          textAlign="center"
          mb={4}
          fontStyle="italic"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
         Remember, consistency beats intensity — small progress each day leads to big achievements.
        </Typography>

       
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    mb: 4,
    maxWidth: 1200,
    mx: 'auto',
    gap: 2.5,
    width: '100%', 
  }}
>
  <TextField
    placeholder="Search tasks with the title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{
      width: 1000,
      '& .MuiInputBase-root': {
        height: 36,
        fontSize: 14,
      },
    }}
  />
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={() => handleDialogOpen('add')}
    sx={{ height: 36 }}
  >
    Add Task
  </Button>
</Box>

       
        <Grid container spacing={4} justifyContent="center">
          {filteredTasks.length === 0 ? (
            <Typography>No tasks found.</Typography>
          ) : (
            filteredTasks.map(task => (
              <Grid item xs={12} md={6} lg={4} key={task._id}>
               <Card
  elevation={2}
  sx={{
    p: 3,
    borderRadius: 3,
    backgroundColor: 'white',
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }}
>
  <Box>
    <Box display="flex" alignItems="center" mb={1}>
      <Checkbox
        checked={task.completed}
        onChange={() => toggleComplete(task)}
        sx={{ p: 0.5 }}
      />
      <Typography
        variant="h6"
        sx={{ textDecoration: task.completed ? 'line-through' : 'none', flexGrow: 1 }}
      >
        {task.title}
      </Typography>
      <IconButton
        aria-controls={menuTaskId === task._id ? 'task-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => handleMenuOpen(e, task._id)}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
    </Box>

    <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
      {task.description || <i>No description provided.</i>}
    </Typography>

   
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Box display="flex" alignItems="center" gap={0.5} color="text.secondary" fontSize={14}>
        <CalendarTodayIcon fontSize="small" />
        <Typography>
          {task.dueDate ? dayjs(task.dueDate).format('MMM D, YYYY') : 'No due date'}
        </Typography>
      </Box>
      <Chip label={task.status} color={statusColors[task.status]} size="small" />
    </Box>

 <Box sx={{ mt: 2 }}>
  <Tooltip title={`${task.progress}%`} arrow>
    <Box
      sx={{
        position: 'relative',
        height: 16, 
        borderRadius: 3,
        backgroundColor: '#f1f1f1',
        overflow: 'hidden',
      }}
    >
      <LinearProgress
        variant="determinate"
        value={task.progress}
        sx={{
          height: '100%',
          '& .MuiLinearProgress-bar': {
            borderRadius: 0,
            background: task.progress === 100
              ? '#4caf50'
              : 'linear-gradient(to right, #1976d2, #42a5f5)',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: 12, 
        }}
      >
        {task.progress}%
      </Box>
    </Box>
  </Tooltip>

  {task.completed && (
    <Typography
      color="green"
      fontWeight="bold"
      mt={1}
      textAlign="center"
      sx={{ mb: 0 }}
    >
      ✅ Completed
    </Typography>
  )}
</Box>

  </Box>
</Card>
              </Grid>
            ))
          )}
        </Grid>

       
        <Menu
          id="task-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              const task = tasks.find(t => t._id === menuTaskId);
              if (task) handleDialogOpen('edit', task);
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              const task = tasks.find(t => t._id === menuTaskId);
              if (task) {
                setTaskToDelete(task);
                setOpenDeleteDialog(true);
                handleMenuClose();
              }
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>

      
        <Dialog open={openTaskDialog} onClose={handleDialogClose} fullWidth>
          <DialogTitle>{dialogMode === 'add' ? 'Add New Task' : 'Edit Task'}</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              value={currentTask.dueDate ? dayjs(currentTask.dueDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Status"
              select
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
              value={currentTask.status}
              onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </TextField>
            <TextField
              label="Progress"
              type="number"
              fullWidth
              margin="normal"
              inputProps={{ min: 0, max: 100 }}
              value={currentTask.progress}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 0) val = 0;
                if (val > 100) val = 100;
                setCurrentTask({ ...currentTask, progress: val });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" onClick={handleTaskSave}>
              {dialogMode === 'add' ? 'Add' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

       
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} fullWidth>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              To delete the task <b>{taskToDelete?.title}</b>, please type the task title below to confirm.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={deleteTitleInput}
              onChange={(e) => setDeleteTitleInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              disabled={deleteTitleInput !== taskToDelete?.title}
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AddTask;
