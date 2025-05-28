import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Switch,
  TextField,
  Paper
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
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
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Avatar
            src="https://static-00.iconduck.com/assets.00/task-accepted-icon-1024x1024-x9189siz.png"
            sx={{ bgcolor: 'white', color: '#283593' }}
          />
          <Typography variant="h6" fontWeight="bold" whiteSpace="nowrap">
            TaskFlow
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: '#5c6bc0' }} />

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

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          User Instance settings
        </Typography>

        <Paper elevation={3} sx={{ p: 3, maxWidth: 700 }}>
          {/* Instance ID */}
          <Typography variant="subtitle1" fontWeight="bold">
            Instance ID
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            IQTAWnSk1Bp4STv2n54cA... <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>Copy</Typography>
          </Typography>

          {/* Account Restrictions */}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Account restrictions
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Allow creating new accounts</Typography>
            <Switch defaultChecked />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography>Allow resetting password</Typography>
            <Switch defaultChecked />
          </Box>

          {/* User Deletion */}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            User deletion
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Grace delay
          </Typography>
          <TextField type="number" defaultValue={30} size="small" />
          <Typography variant="body2" color="text.secondary" mt={1}>
            This is the number of days without a login after which a user account will be removed.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsPage;
