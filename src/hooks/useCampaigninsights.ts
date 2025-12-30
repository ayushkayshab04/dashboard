import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCampaignInsights } from '../api/campaigns';


export const useCampaignInsights = (id: string) =>
  useQuery({
    queryKey: ['campaign', id, 'insights'],
    queryFn: () => getCampaignInsights(id),
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
  });


export const useLiveCampaignInsights = (
  id: string,
  enabled: boolean,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !id) return;

    const source = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    source.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        queryClient.setQueryData(
          ['campaign', id, 'insights'],
          data
        );
      } catch {
      }
    };

    source.onerror = () => {
      source.close();

      onError?.();

      queryClient.invalidateQueries({
        queryKey: ['campaign', id, 'insights'],
      });
    };

    return () => {
      source.close();
    };
  }, [id, enabled, queryClient, onError]);
};
