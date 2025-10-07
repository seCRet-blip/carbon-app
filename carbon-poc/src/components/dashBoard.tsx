import { Box } from '@mui/material';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { CarbonStatsCards } from './dashboard/CarbonStatsCards';
import { MapAccessCard } from './dashboard/MapAccessCard';
import { CarbonPortfolioCard } from './dashboard/CarbonPortfolioCard';
import { RecentActivityCard } from './dashboard/RecentActivityCard';
import { ProjectTypesSection } from './dashboard/ProjectTypesSection';
import { GettingStartedGuide } from './dashboard/GettingStartedGuide';

type DashboardProps = {
  user: string;
  onNavigateToMap: () => void;
  onLogout: () => void;
};

export function Dashboard({ user, onNavigateToMap, onLogout }: DashboardProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <DashboardHeader user={user} onLogout={onLogout} />
      
      <CarbonStatsCards />

      {/* Main Content Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 350px' }}>
          <MapAccessCard onNavigateToMap={onNavigateToMap} />
        </Box>
        <Box sx={{ flex: '1 1 350px' }}>
          <CarbonPortfolioCard />
        </Box>
        <Box sx={{ flex: '1 1 350px' }}>
          <RecentActivityCard />
        </Box>
      </Box>

      {/* Project Types Section */}
      <Box sx={{ mb: 3 }}>
        <ProjectTypesSection />
      </Box>

      {/* Getting Started Guide */}
      <GettingStartedGuide />
    </Box>
  );
}