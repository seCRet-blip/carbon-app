import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';

export function CarbonPortfolioCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <NatureIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          My Carbon Portfolio
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Track your environmental impact:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">• Active Projects: 0</Typography>
          <Typography variant="body1">• Credits Generated: 0</Typography>
          <Typography variant="body1">• Projects Supported: 0</Typography>
          <Typography variant="body1">• Impact Score: Beginner</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Chip label="Get Started" variant="outlined" color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}
