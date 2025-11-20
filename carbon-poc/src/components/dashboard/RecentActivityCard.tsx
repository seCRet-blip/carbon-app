import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function RecentActivityCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No assessments yet. Upload an image of your land to get started! Our AI will analyze vegetation coverage, soil quality, and terrain to estimate your land's carbon credit potential.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" size="small" startIcon={<CloudUploadIcon />}>
            Upload Image
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
