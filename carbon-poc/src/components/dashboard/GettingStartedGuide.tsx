import { Card, CardContent, Typography, Box } from '@mui/material';

export function GettingStartedGuide() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Getting Started with Carbon Credits
        </Typography>
        <Typography variant="body1" paragraph>
          New Zealand is leading the way in carbon offset initiatives. Here's how you can participate:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">1. Explore Projects</Typography>
            <Typography variant="body2">
              Use our interactive map to discover verified carbon offset projects across New Zealand.
            </Typography>
          </Box>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">2. Invest in Impact</Typography>
            <Typography variant="body2">
              Purchase carbon credits from projects that align with your environmental goals.
            </Typography>
          </Box>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" color="primary">3. Track Progress</Typography>
            <Typography variant="body2">
              Monitor your carbon offset portfolio and see your environmental impact grow.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
