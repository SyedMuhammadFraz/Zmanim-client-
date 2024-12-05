'use client'
import { useEffect, useState } from 'react';

// Define the type for the data you expect from the Grist API
interface GristData {
  // Example fields, adjust according to the actual API response structure
  [key: string]: any;
}

const GristPage = () => {
  const [data, setData] = useState<GristData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/grist');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: GristData = await res.json(); // Type the result as GristData
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Inline CSS styles
  const styles = {
    page: {
      padding: '20px',
    },
    loading: {
      fontSize: '20px',
      color: '#888',
    },
    error: {
      fontSize: '20px',
      color: 'red',
    },
    data: {
      backgroundColor: '#f4f4f4',
      padding: '10px',
      borderRadius: '5px',
      fontFamily: 'monospace' as const,
    },
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error: {error}</p>;
  }

  return (
    <div style={styles.page}>
      <h1>Data from Grist API</h1>
      <pre style={styles.data}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GristPage;
