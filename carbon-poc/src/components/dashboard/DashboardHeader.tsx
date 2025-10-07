import { Box, Typography, Button } from '@mui/material';

type DashboardHeaderProps = {
  user: string;
  onLogout: () => void;
};

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1">
          Welcome back, {user}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Carbon Credit Management Portal
        </Typography>
      </Box>
      <Button variant="outlined" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
}
