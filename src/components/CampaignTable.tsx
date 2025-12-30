import CampaignRow from "./CampaignRow";

const CampaignTable = ({ campaigns }: any) => {
    // console.log("=====+Data,",campaigns)
  return (
    <table>
      <thead>
        <tr>
          <th>Campaign</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.campaigns.map((c: any) => (
          <CampaignRow key={c.id} campaign={c} />
        ))}
      </tbody>
    </table>
  );
};

export default CampaignTable;
