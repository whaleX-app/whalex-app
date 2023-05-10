import { useEffect } from 'react';
import { statusUpdateTaskHandler } from '@tasks/status-update-task.';

export const useStatusUpdate = () =>
  useEffect(() => {
    const timerId = setInterval(statusUpdateTaskHandler, 60000 * 2);
    return () => clearInterval(timerId);
  }, []);
