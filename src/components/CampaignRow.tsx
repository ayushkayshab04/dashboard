import { useState, useMemo, useEffect } from 'react';
import {
  useCampaignInsights,
  useLiveCampaignInsights,
} from '../hooks/useCampaigninsights';
import CampaignRowSkeleton from './CampaignRowSkeleton';

const CampaignRow = ({ campaign }: any) => {
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCampaignInsights(open ? campaign.id : '');

  useLiveCampaignInsights(campaign.id, live, () => {
    setLive(false);
  });

  const insights = useMemo(() => {
    if (!data) return null;
    return data.insights ?? data;
  }, [data]);

  useEffect(() => {
    if (!live || !insights) return;

    setFlicker(true);
    const t = setTimeout(() => setFlicker(false), 300);

    return () => clearTimeout(t);
  }, [insights, live]);

  return (
    <>
      <tr onClick={() => setOpen(!open)}>
        <td>{campaign.name}</td>
        <td>{campaign.status}</td>
      </tr>

      {open && (
        isLoading ? (
          <CampaignRowSkeleton />
        ) : isError ? (
          <tr>
            <td colSpan={2}>
              <div className="campaign-error">
                <span>⚠️ Failed to load campaign stats</span>
                <button onClick={() => refetch()}>
                  Retry
                </button>
              </div>
            </td>
          </tr>
        ) : insights ? (
          <tr>
            <td colSpan={2}>
              <div
                className={`campaign-details ${
                  flicker ? 'live-flicker' : ''
                }`}
              >
                <div className="metrics">
                  <span>Impr: {insights.impressions}</span>
                  <span>Clicks: {insights.clicks}</span>
                  <span>CTR: {insights.ctr}%</span>
                  <span>Spend: ₹{insights.spend}</span>
                </div>

                <label className="live-toggle">
                  <input
                    type="checkbox"
                    checked={live}
                    onChange={() => setLive(!live)}
                  />
                  <span className="live-dot" />
                  <span className="live-text">Live</span>
                </label>
              </div>
            </td>
          </tr>
        ) : null
      )}
    </>
  );
};

export default CampaignRow;
