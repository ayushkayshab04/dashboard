import { useQuery } from '@tanstack/react-query';
import { getCampaigns, getAllInsights } from '../api/campaigns';

export const useDashboardData = () => {
  const campaignsQuery = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });

  const insightsQuery = useQuery({
    queryKey: ['campaigns', 'insights'],
    queryFn: getAllInsights,
  });

  return {
    campaigns: campaignsQuery.data,
    insights: insightsQuery.data,

    campaignsLoading: campaignsQuery.isLoading,
    insightsLoading: insightsQuery.isLoading,

    isError: campaignsQuery.isError || insightsQuery.isError,
  };
};
