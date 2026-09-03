import { Card, CardContent, Typography, Box } from '@mui/material';

export function GettingStartedGuide() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          How to Assess Your Land for Carbon Credits
        </Typography>
        <Typography variant="body1" paragraph>
          Get started in three simple steps and discover your land's carbon sequestration potential:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">1. Upload Images</Typography>
            <Typography variant="body2">
              Take clear photos of your land from multiple angles. Include vegetation, terrain, and any water features for the most accurate assessment.
            </Typography>
          </Box>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">2. AI Analysis</Typography>
            <Typography variant="body2">
              Our AI analyzes vegetation coverage, soil conditions, and land characteristics to estimate carbon sequestration capacity and potential credits.
            </Typography>
          </Box>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">3. View Results</Typography>
            <Typography variant="body2">
              Receive a detailed report on your land's carbon credit potential, including estimated tCO₂ and recommended improvement strategies.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
