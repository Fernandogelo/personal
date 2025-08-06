import React from 'react';
import '../styles/InsightList.css';

export default function InsightList({ insights }) {
  return (
    <div className="insight-list">
      <h3 className="insight-title">Insights</h3>
      {insights.length === 0 ? (
        <p className="no-insights">No insights yet.</p>
      ) : (
        <ul>
          {insights.map(i => (
            <li key={i.id}>
              <strong>{new Date(i.created_at).toLocaleString()}:</strong> {i.recommendations}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
