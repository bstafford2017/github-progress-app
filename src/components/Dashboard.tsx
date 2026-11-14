import React from 'react';
import { useChangeStore } from '../store/changeStore';
import { StatCard } from './StatCard';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const metrics = useChangeStore((state) => state.getMetrics());
  const changes = useChangeStore((state) => state.changes);

  const recentChanges = changes.slice(0, 5);

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <StatCard label="Total Changes" value={metrics.totalChanges} color="#3b82f6" />
        <StatCard label="Completed" value={metrics.completed} color="#10b981" />
        <StatCard label="In Progress" value={metrics.inProgress} color="#f59e0b" />
        <StatCard label="Pending" value={metrics.pending} color="#6b7280" />
        <StatCard label="Failed" value={metrics.failed} color="#ef4444" />
      </div>

      <div className="recent-changes-card">
        <h2 className="recent-changes-title">Recent Changes</h2>
        {recentChanges.length === 0 ? (
          <p className="no-changes-text">No changes yet. Create your first change!</p>
        ) : (
          <div className="changes-list">
            {recentChanges.map((change) => (
              <div key={change.id} className="change-item">
                <div className="change-header">
                  <div className="change-info">
                    <h3 className="change-title">{change.title}</h3>
                    <p className="change-purpose">{change.purpose}</p>
                  </div>
                  <span className={`status-badge ${change.status}`}>
                    {change.status}
                  </span>
                </div>
                <div className="change-footer">
                  <span className="change-time">{change.timestamp.toLocaleString()}</span>
                  {change.prUrl && (
                    <a href={change.prUrl} target="_blank" rel="noopener noreferrer" className="pr-link">
                      View PR
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
