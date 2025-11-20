import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

type MapAccessCardProps = {
  onNavigateToMap: () => void;
};

export function MapAccessCard({ onNavigateToMap }: MapAccessCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <ImageIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Upload Land Image
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload photos of your land to assess its carbon credit potential. Our AI analyzes vegetation, terrain, and land use to estimate carbon sequestration capacity.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="AI-Powered Analysis" size="small" color="success" />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={onNavigateToMap}
          sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
        >
          Upload & Assess
        </Button>
      </CardActions>
    </Card>
  );
}
