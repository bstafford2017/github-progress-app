import React, { useEffect } from 'react';
import { useChangeStore } from '../store/changeStore';

interface TaskProps {
  taskName: string;
  taskDescription: string;
  purpose: string;
}

export const TaskRecorder: React.FC<TaskProps> = ({ taskName, taskDescription, purpose }) => {
  useEffect(() => {
    // Auto-record task in the app - use getState() to avoid infinite loop
    useChangeStore.getState().addChange({
      title: taskName,
      description: taskDescription,
      purpose: purpose,
      status: 'in-progress',
      prUrl: undefined,
      branchName: undefined,
    });
  }, [taskName, taskDescription, purpose]);

  return null;
};
