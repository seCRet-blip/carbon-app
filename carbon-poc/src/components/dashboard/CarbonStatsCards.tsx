import { Box, Card, CardContent, Typography } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import ForestIcon from '@mui/icons-material/Forest';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export function CarbonStatsCards() {
  return (
    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
      <Box sx={{ flex: '1 1 250px' }}>
        <Card sx={{ textAlign: 'center', backgroundColor: '#e8f5e8' }}>
          <CardContent>
            <NatureIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" color="success.main">0</Typography>
            <Typography variant="body2" color="text.secondary">
              Carbon Credits Earned
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: '1 1 250px' }}>
        <Card sx={{ textAlign: 'center', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" color="primary.main">$0.00</Typography>
            <Typography variant="body2" color="text.secondary">
              Credit Value (NZD)
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: '1 1 250px' }}>
        <Card sx={{ textAlign: 'center', backgroundColor: '#fff3e0' }}>
          <CardContent>
            <ForestIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" color="warning.main">0</Typography>
            <Typography variant="body2" color="text.secondary">
              Trees Planted
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: '1 1 250px' }}>
        <Card sx={{ textAlign: 'center', backgroundColor: '#fce4ec' }}>
          <CardContent>
            <TrendingUpIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h4" color="secondary.main">0kg</Typography>
            <Typography variant="body2" color="text.secondary">
              CO₂ Offset This Month
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
