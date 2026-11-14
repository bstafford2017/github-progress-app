import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '../components/Dashboard';
import { useChangeStore } from '../store/changeStore';

describe('Dashboard Component', () => {
  beforeEach(() => {
    const store = useChangeStore.getState();
    store.changes = [];
  });

  test('renders dashboard with title', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Recent Changes/i)).toBeInTheDocument();
  });

  test('displays stat cards with correct metrics', () => {
    const store = useChangeStore.getState();
    store.addChange({
      title: 'Test Change',
      description: 'Test',
      purpose: 'Testing',
      status: 'completed',
    });

    render(<Dashboard />);
    expect(screen.getByText('Total Changes')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('shows "no changes" message when empty', () => {
    render(<Dashboard />);
    expect(screen.getByText(/No changes yet/i)).toBeInTheDocument();
  });

  test('displays recent changes', () => {
    const store = useChangeStore.getState();
    store.addChange({
      title: 'Fix Bugs',
      description: 'Fix critical bugs',
      purpose: 'Improve stability',
      status: 'in-progress',
    });

    render(<Dashboard />);
    expect(screen.getByText('Fix Bugs')).toBeInTheDocument();
    expect(screen.getByText('Improve stability')).toBeInTheDocument();
  });

  test('displays PR link when available', () => {
    const store = useChangeStore.getState();
    store.addChange({
      title: 'Add Feature',
      description: 'New feature',
      purpose: 'Enhancement',
      status: 'pending',
      prUrl: 'https://github.com/user/repo/pull/1',
    });

    render(<Dashboard />);
    const prLink = screen.getByText('View PR');
    expect(prLink).toHaveAttribute('href', 'https://github.com/user/repo/pull/1');
  });
});
