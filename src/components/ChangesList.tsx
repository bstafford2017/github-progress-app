import React, { useState } from 'react';
import { useChangeStore } from '../store/changeStore';
import { GitHubChange } from '../types';
import './ChangesList.css';

export const ChangesList: React.FC = () => {
  const changes = useChangeStore((state) => state.changes);
  const updateChange = useChangeStore((state) => state.updateChange);
  const deleteChange = useChangeStore((state) => state.deleteChange);
  const addChange = useChangeStore((state) => state.addChange);
  const [filter, setFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    purpose: '',
    prUrl: '',
    branchName: '',
  });

  const filteredChanges = changes.filter(
    (change) => filter === 'all' || change.status === filter
  );

  const handleAddChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.purpose) return;

    addChange({
      title: formData.title,
      description: formData.description,
      purpose: formData.purpose,
      status: 'pending',
      prUrl: formData.prUrl || undefined,
      branchName: formData.branchName || undefined,
    });

    setFormData({
      title: '',
      description: '',
      purpose: '',
      prUrl: '',
      branchName: '',
    });
    setShowForm(false);
  };

  return (
    <div className="changes-list-container">
      <div className="changes-header">
        <h1>All Changes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ New Change'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddChange} className="changes-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Fix security vulnerabilities"
              required
            />
          </div>

          <div className="form-group">
            <label>Purpose</label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Why is this change needed?"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the change"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Branch Name</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                placeholder="e.g., fix/security-vulnerabilities"
              />
            </div>
            <div className="form-group">
              <label>PR URL</label>
              <input
                type="url"
                value={formData.prUrl}
                onChange={(e) => setFormData({ ...formData, prUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <button type="submit" className="btn-success">
            Add Change
          </button>
        </form>
      )}

      <div className="filter-buttons">
        {(['all', 'completed', 'in-progress', 'pending', 'failed'] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      <div className="changes-items">
        {filteredChanges.length === 0 ? (
          <p className="no-changes">No changes found</p>
        ) : (
          filteredChanges.map((change) => (
            <ChangeCard
              key={change.id}
              change={change}
              onUpdate={updateChange}
              onDelete={deleteChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface ChangeCardProps {
  change: GitHubChange;
  onUpdate: (id: string, updates: Partial<GitHubChange>) => void;
  onDelete: (id: string) => void;
}

const ChangeCard: React.FC<ChangeCardProps> = ({ change, onUpdate, onDelete }) => {
  return (
    <div className="change-card">
      <div className="change-card-header">
        <div className="change-card-info">
          <h3>{change.title}</h3>
          <p><strong>Purpose:</strong> {change.purpose}</p>
        </div>
        <select
          value={change.status}
          onChange={(e) =>
            onUpdate(change.id, { status: e.target.value as GitHubChange['status'] })
          }
          className={`status-select ${change.status}`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {change.description && (
        <p className="change-card-description">{change.description}</p>
      )}

      <div className="change-card-meta">
        {change.branchName && (
          <div>
            <strong>Branch:</strong> <code>{change.branchName}</code>
          </div>
        )}
        <div>
          <strong>Created:</strong> {change.timestamp.toLocaleString()}
        </div>
      </div>

      <div className="change-card-footer">
        <div>
          {change.prUrl && (
            <a href={change.prUrl} target="_blank" rel="noopener noreferrer" className="pr-link">
              View Pull Request
            </a>
          )}
        </div>
        <button onClick={() => onDelete(change.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};
