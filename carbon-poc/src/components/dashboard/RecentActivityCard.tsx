import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';

export function RecentActivityCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No carbon credit activity yet. Start by exploring projects on the map and making your first investment in New Zealand's green future!
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" size="small" startIcon={<ForestIcon />}>
            Browse Projects
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
