import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangesList } from '../components/ChangesList';
import { useChangeStore } from '../store/changeStore';

describe('ChangesList Component', () => {
  beforeEach(() => {
    useChangeStore.setState({ changes: [] });
  });

  test('renders changes list page', () => {
    render(<ChangesList />);
    expect(screen.getByText('All Changes')).toBeInTheDocument();
    expect(screen.getByText('+ New Change')).toBeInTheDocument();
  });

  test('displays form when add change button clicked', async () => {
    const user = userEvent.setup();
    render(<ChangesList />);

    const addButton = screen.getByText('+ New Change');
    await user.click(addButton);

    expect(screen.getByPlaceholderText(/e.g., Fix security vulnerabilities/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Why is this change needed?/)).toBeInTheDocument();
  });

  test('adds new change via form submission', async () => {
    const user = userEvent.setup();
    render(<ChangesList />);

    await user.click(screen.getByText('+ New Change'));

    await user.type(
      screen.getByPlaceholderText(/e.g., Fix security vulnerabilities/),
      'Security Update'
    );
    await user.type(
      screen.getByPlaceholderText(/Why is this change needed?/),
      'Fix vulnerabilities'
    );

    await user.click(screen.getByText('Add Change'));

    expect(screen.getByText('Security Update')).toBeInTheDocument();
  });

  test('filters changes by status', async () => {
    const user = userEvent.setup();
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Completed Task',
      description: 'Done',
      purpose: 'Test',
      status: 'completed',
    });
    store.addChange({
      title: 'Pending Task',
      description: 'Waiting',
      purpose: 'Test',
      status: 'pending',
    });

    render(<ChangesList />);

    await user.click(screen.getByText('Completed'));
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.queryByText('Pending Task')).not.toBeInTheDocument();
  });

  test('updates change status via dropdown', async () => {
    const user = userEvent.setup();
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Update Me',
      description: 'Change status',
      purpose: 'Test',
      status: 'pending',
    });

    render(<ChangesList />);

    const selects = screen.getAllByDisplayValue('Pending');
    await user.selectOptions(selects[0], 'in-progress');

    expect(screen.getByDisplayValue('In Progress')).toBeInTheDocument();
  });

  test('deletes change', async () => {
    const user = userEvent.setup();
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Delete Me',
      description: 'Will be deleted',
      purpose: 'Test',
      status: 'pending',
    });

    render(<ChangesList />);

    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);

    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });

  test('shows no changes message when filtered list is empty', async () => {
    const user = userEvent.setup();
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Completed Task',
      description: 'Done',
      purpose: 'Test',
      status: 'completed',
    });

    render(<ChangesList />);

    await user.click(screen.getByText('Failed'));
    expect(screen.getByText('No changes found')).toBeInTheDocument();
  });
});
