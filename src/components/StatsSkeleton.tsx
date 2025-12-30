import React from 'react'

const StatsSkeleton = () => (
  <div className="stats">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="card">
        <div className="skeleton" style={{ height: 18, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 24 }} />
      </div>
    ))}
  </div>
);

export default StatsSkeleton

