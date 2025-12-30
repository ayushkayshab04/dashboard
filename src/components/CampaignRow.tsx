import { useState } from 'react';
import {
  useCampaignInsights,
  useLiveCampaignInsights,
} from '../hooks/useCampaigninsights';

const CampaignRow = ({ campaign }: any) => {
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState(false);

  const { data } = useCampaignInsights(open ? campaign.id : '');
  useLiveCampaignInsights(campaign.id, live);
    console.log("=====Data,",data)
  return (
    <>
      <tr onClick={() => setOpen(!open)}>
        <td>{campaign.name}</td>
        <td>{campaign.status}</td>
      </tr>

      {open && data && (
        <tr>
          <td colSpan={2}>
            <div className="campaign-details">
              <div className="metrics">
                <span>Impr: {data.insights.impressions}</span>
                <span>Clicks: {data.insights.clicks}</span>
                <span>CTR: {data.insights.ctr}%</span>
                <span>Spend: ₹{data.insights.spend}</span>
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={live}
                  onChange={() => setLive(!live)}
                />
                Live
              </label>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CampaignRow;
