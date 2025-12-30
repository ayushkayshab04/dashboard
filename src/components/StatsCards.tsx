import StatsSkeleton from "./StatsSkeleton";



const StatsCards = ({ data, loading }: { data: any; loading: boolean }) => {
  if (loading) {
    return <StatsSkeleton />;
  }
  return (
    <div className="stats">
      <div className="card">Impressions: {data.insights.total_impressions}</div>
      <div className="card">Clicks: {data.insights.total_clicks}</div>
      <div className="card">CTR: {data.insights.avg_ctr}%</div>
      <div className="card">Spend: ₹{data.insights.avg_cpc}</div>
    </div>
  );
};



export default StatsCards;
