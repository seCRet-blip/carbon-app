import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';

type MapAccessCardProps = {
  onNavigateToMap: () => void;
};

export function MapAccessCard({ onNavigateToMap }: MapAccessCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Carbon Projects Map
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore carbon offset projects across New Zealand. Find tree planting sites, renewable energy projects, and conservation areas.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="New Zealand Focus" size="small" color="success" />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ExploreIcon />}
          onClick={onNavigateToMap}
          sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
        >
          Explore Projects
        </Button>
      </CardActions>
    </Card>
  );
}
