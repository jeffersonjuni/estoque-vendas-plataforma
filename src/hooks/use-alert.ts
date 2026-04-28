import { useEffect, useState } from 'react';

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAlerts() {
    try {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000); // 

    return () => clearInterval(interval);
  }, []);

  return { alerts, loading, refetch: fetchAlerts };
}