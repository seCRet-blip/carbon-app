import { Paper, Typography, Box, Chip } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';
import GrassIcon from '@mui/icons-material/Grass';
import WaterIcon from '@mui/icons-material/Water';

export function ProjectTypesSection() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        What We Analyze in Your Images
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <ForestIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
          <Typography variant="h6">Vegetation Coverage</Typography>
          <Typography variant="body2" color="text.secondary">
            Trees, native plants, and forest density for carbon sequestration
          </Typography>
          <Chip label="High Impact" size="small" color="success" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <TerrainIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6">Terrain Analysis</Typography>
          <Typography variant="body2" color="text.secondary">
            Slope, elevation, and soil conditions affecting carbon storage
          </Typography>
          <Chip label="AI-Powered" size="small" color="primary" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <GrassIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h6">Land Use</Typography>
          <Typography variant="body2" color="text.secondary">
            Agricultural, pastoral, or conservation land classification
          </Typography>
          <Chip label="Verified" size="small" color="warning" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 250px' }}>
          <WaterIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
          <Typography variant="h6">Water Features</Typography>
          <Typography variant="body2" color="text.secondary">
            Wetlands and waterways that enhance carbon capture
          </Typography>
          <Chip label="Bonus Credits" size="small" color="info" sx={{ mt: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
}
