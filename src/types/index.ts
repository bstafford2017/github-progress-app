export interface GitHubChange {
  id: string;
  title: string;
  description: string;
  purpose: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  timestamp: Date;
  prUrl?: string;
  branchName?: string;
  filesChanged?: number;
  additions?: number;
  deletions?: number;
}

export interface ProgressMetrics {
  totalChanges: number;
  completed: number;
  inProgress: number;
  pending: number;
  failed: number;
}
