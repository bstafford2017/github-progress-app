import { useChangeStore } from '../store/changeStore';
import { GitHubChange } from '../types';

describe('Change Store (Zustand)', () => {
  beforeEach(() => {
    useChangeStore.setState({ changes: [] });
  });

  test('adds a new change', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Test Change',
      description: 'A test change',
      purpose: 'Testing',
      status: 'pending',
    });

    const state = useChangeStore.getState();
    expect(state.changes).toHaveLength(1);
    expect(state.changes[0].title).toBe('Test Change');
    expect(state.changes[0].status).toBe('pending');
  });

  test('generates unique IDs for changes', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'First',
      description: '',
      purpose: 'Test',
      status: 'pending',
    });
    store.addChange({
      title: 'Second',
      description: '',
      purpose: 'Test',
      status: 'pending',
    });

    const state = useChangeStore.getState();
    expect(state.changes[0].id).not.toBe(state.changes[1].id);
  });

  test('updates a change', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Original',
      description: 'Original',
      purpose: 'Test',
      status: 'pending',
    });

    const changeId = store.changes[0].id;
    store.updateChange(changeId, { status: 'completed' });

    const state = useChangeStore.getState();
    expect(state.changes[0].status).toBe('completed');
  });

  test('deletes a change', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'To Delete',
      description: '',
      purpose: 'Test',
      status: 'pending',
    });

    const changeId = store.changes[0].id;
    store.deleteChange(changeId);

    const state = useChangeStore.getState();
    expect(state.changes).toHaveLength(0);
  });

  test('gets metrics', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Completed',
      description: '',
      purpose: 'Test',
      status: 'completed',
    });
    store.addChange({
      title: 'In Progress',
      description: '',
      purpose: 'Test',
      status: 'in-progress',
    });
    store.addChange({
      title: 'Pending',
      description: '',
      purpose: 'Test',
      status: 'pending',
    });

    const metrics = store.getMetrics();

    expect(metrics.totalChanges).toBe(3);
    expect(metrics.completed).toBe(1);
    expect(metrics.inProgress).toBe(1);
    expect(metrics.pending).toBe(1);
    expect(metrics.failed).toBe(0);
  });

  test('gets change by ID', () => {
    const store = useChangeStore.getState();

    store.addChange({
      title: 'Find Me',
      description: '',
      purpose: 'Test',
      status: 'pending',
    });

    const changeId = store.changes[0].id;
    const found = store.getChangeById(changeId);

    expect(found).toBeDefined();
    expect(found?.title).toBe('Find Me');
  });

  test('returns undefined for non-existent ID', () => {
    const store = useChangeStore.getState();
    const found = store.getChangeById('non-existent-id');

    expect(found).toBeUndefined();
  });
});
