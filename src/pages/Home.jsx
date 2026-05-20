import { useState, useEffect } from 'react';
import { API_BASE } from '../api';

function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    fetch(`${API_BASE}/api/stats`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Eroare la incarcare: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        setStats(data);
        setLoading(false);
      })
      .catch(function(err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca statistici...</p>;
  }

  if (error) {
    return <p>Eroare: {error}</p>;
  }

  return (
    <div>
      <h2>Home</h2>
      <p>Bine ai venit pe dashboard-ul meu!</p>
      <section>
        <h3>Statistici live</h3>
        <p>Total proiecte: {stats.total}</p>
        <p>Finalizate: {stats.done}</p>
        <p>In lucru: {stats.inProgress}</p>
      </section>
    </div>
  );
}

export default Home;
