import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCampaignInsights } from '../api/campaigns';

export const useCampaignInsights = (id: string) =>
  useQuery({
    queryKey: ['campaign', id, 'insights'],
    queryFn: () => getCampaignInsights(id),
    enabled: !!id,
  });

export const useLiveCampaignInsights = (id: string, enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const source = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      queryClient.setQueryData(['campaign', id, 'insights'], data);
    };

    return () => source.close();
  }, [id, enabled]);
};
