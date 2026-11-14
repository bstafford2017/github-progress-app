import React from 'react';
import './StatCard.css';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-color-box" style={{ backgroundColor: color }}>
        <div className="stat-value">{value}</div>
      </div>
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <p className="stat-number">{value}</p>
      </div>
    </div>
  );
};
