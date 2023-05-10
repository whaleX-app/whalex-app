import { useEffect, useState } from 'react';

export const useUpdate = (interval: number) => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setLastUpdate(new Date()), interval);

    return () => clearInterval(timerId);
  }, [lastUpdate]);

  return lastUpdate.getTime();
};
