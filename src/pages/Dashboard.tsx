import { useDashboardData } from '../hooks/useDashboardData';
import Skeleton from '../components/Skeleton';
import StatsCards from '../components/StatsCards';
import CampaignTable from '../components/CampaignTable';

const Dashboard = () => {
  const {
    campaigns,
    insights,
    campaignsLoading,
    insightsLoading,
    isError,
  } = useDashboardData();

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="container">
      <h1>Campaign Performance Dashboard</h1>

      {/* 🔹 Stats have their OWN loader */}
      <StatsCards data={insights} loading={insightsLoading} />

      {/* 🔹 Campaigns load independently */}
      {campaignsLoading ? (
        <Skeleton height={220} />
      ) : (
        <CampaignTable campaigns={campaigns} />
      )}
    </div>
  );
};

export default Dashboard;
