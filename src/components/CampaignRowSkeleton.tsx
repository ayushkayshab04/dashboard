import React from 'react'

const CampaignRowSkeleton = () => {
  return (
    <tr>
      <td colSpan={2}>
        <div className="campaign-details">
          <div className="metrics">
            <div className="campaign-skeleton" style={{ width: 80, height: 16 }} />
            <div className="campaign-skeleton" style={{ width: 80, height: 16 }} />
            <div className="campaign-skeleton" style={{ width: 80, height: 16 }} />
            <div className="campaign-skeleton" style={{ width: 80, height: 16 }} />
          </div>
        </div>
      </td>
    </tr>
  );
};


export default CampaignRowSkeleton