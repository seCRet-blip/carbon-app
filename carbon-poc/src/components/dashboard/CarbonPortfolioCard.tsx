import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export function CarbonPortfolioCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <PhotoLibraryIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          My Assessments
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Track your land assessments:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">• Images Uploaded: 0</Typography>
          <Typography variant="body1">• Assessments Complete: 0</Typography>
          <Typography variant="body1">• Estimated Credits: 0 tCO₂</Typography>
          <Typography variant="body1">• Land Area Analyzed: 0 ha</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Chip label="Upload Your First Image" variant="outlined" color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}
