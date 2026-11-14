import { create } from 'zustand';
import { GitHubChange, ProgressMetrics } from '../types';

interface ChangeStore {
  changes: GitHubChange[];
  addChange: (change: Omit<GitHubChange, 'id' | 'timestamp'>) => void;
  updateChange: (id: string, updates: Partial<GitHubChange>) => void;
  deleteChange: (id: string) => void;
  getMetrics: () => ProgressMetrics;
  getChangeById: (id: string) => GitHubChange | undefined;
}

export const useChangeStore = create<ChangeStore>((set, get) => ({
  changes: [],

  addChange: (change) =>
    set((state) => ({
      changes: [
        {
          ...change,
          id: `change-${Date.now()}`,
          timestamp: new Date(),
        } as GitHubChange,
        ...state.changes,
      ],
    })),

  updateChange: (id, updates) =>
    set((state) => ({
      changes: state.changes.map((change) =>
        change.id === id ? { ...change, ...updates } : change
      ),
    })),

  deleteChange: (id) =>
    set((state) => ({
      changes: state.changes.filter((change) => change.id !== id),
    })),

  getMetrics: () => {
    const changes = get().changes;
    return {
      totalChanges: changes.length,
      completed: changes.filter((c) => c.status === 'completed').length,
      inProgress: changes.filter((c) => c.status === 'in-progress').length,
      pending: changes.filter((c) => c.status === 'pending').length,
      failed: changes.filter((c) => c.status === 'failed').length,
    };
  },

  getChangeById: (id) => get().changes.find((c) => c.id === id),
}));
