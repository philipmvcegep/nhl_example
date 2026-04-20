import React, { useState, useEffect } from 'react';
import { ApiService } from './components/ApiService/ApiService.jsx';
import ShotTable from './components/ShotTable/ShotTable.jsx';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const shots = await ApiService.getGameShots();
        setData(shots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);


  if (loading) return <div className="status">Chargement des statistiques...</div>;

  if (error) return (
    <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
      <h3>Erreur de récupération</h3>
      <p>{error}</p>
    </div>
  );

return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Habs Live Tracker 🏒</h1>
      
      <header style={{ marginBottom: '20px' }}>
        <strong>Événements trouvés :</strong> {data.length}
      </header>

      {/* On délègue tout l'affichage de la table ici */}
      <ShotTable plays={data} />
    </div>
  );
}

export default App;