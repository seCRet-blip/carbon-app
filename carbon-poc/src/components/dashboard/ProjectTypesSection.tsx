import { Paper, Typography, Box, Chip } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import NatureIcon from '@mui/icons-material/Nature';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export function ProjectTypesSection() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Available Carbon Offset Project Types
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <ForestIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
          <Typography variant="h6">Forestry Projects</Typography>
          <Typography variant="body2" color="text.secondary">
            Tree planting and forest restoration initiatives across NZ
          </Typography>
          <Chip label="High Impact" size="small" color="success" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <NatureIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6">Renewable Energy</Typography>
          <Typography variant="body2" color="text.secondary">
            Solar, wind, and hydro projects generating clean energy
          </Typography>
          <Chip label="Verified" size="small" color="primary" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <LocationOnIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h6">Conservation</Typography>
          <Typography variant="body2" color="text.secondary">
            Protecting native ecosystems and biodiversity hotspots
          </Typography>
          <Chip label="Native Focus" size="small" color="warning" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <TrendingUpIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
          <Typography variant="h6">Regenerative Agriculture</Typography>
          <Typography variant="body2" color="text.secondary">
            Sustainable farming practices that capture carbon
          </Typography>
          <Chip label="Emerging" size="small" color="info" sx={{ mt: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
}
