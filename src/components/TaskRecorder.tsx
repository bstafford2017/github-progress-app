import React, { useEffect } from 'react';
import { useChangeStore } from '../store/changeStore';

interface TaskProps {
  taskName: string;
  taskDescription: string;
  purpose: string;
}

export const TaskRecorder: React.FC<TaskProps> = ({ taskName, taskDescription, purpose }) => {
  const addChange = useChangeStore((state) => state.addChange);

  useEffect(() => {
    // Auto-record task in the app
    addChange({
      title: taskName,
      description: taskDescription,
      purpose: purpose,
      status: 'in-progress',
      prUrl: undefined,
      branchName: undefined,
    });
  }, [taskName, taskDescription, purpose, addChange]);

  return null;
};
