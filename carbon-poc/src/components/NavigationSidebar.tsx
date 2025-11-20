import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import LogoutIcon from '@mui/icons-material/Logout';
import NatureIcon from '@mui/icons-material/Nature';

type NavigationSidebarProps = {
  currentView: 'dashboard' | 'map';
  onNavigate: (view: 'dashboard' | 'map') => void;
  onLogout: () => void;
  user: string;
};

export function NavigationSidebar({ currentView, onNavigate, onLogout, user }: NavigationSidebarProps) {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1100,
        boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <NatureIcon sx={{ fontSize: 32, color: 'success.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Carbon Credits
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          {user}
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onNavigate('dashboard')}
            selected={currentView === 'dashboard'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderLeft: '4px solid',
                borderColor: 'success.main',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.3)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: currentView === 'dashboard' ? 'success.main' : 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onNavigate('map')}
            selected={currentView === 'map'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderLeft: '4px solid',
                borderColor: 'success.main',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.3)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon>
              <MapIcon sx={{ color: currentView === 'map' ? 'success.main' : 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Upload & Assess" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Logout Button */}
      <Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
}