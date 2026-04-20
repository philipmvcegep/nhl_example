import React, { useState, useEffect } from 'react';
import { ApiService } from './components/ApiService/ApiService.jsx';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // On définit une fonction asynchrone interne pour utiliser le Controller
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

  // Gestion des états d'affichage (Early Returns)
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
        <strong>Tirs et buts compilés :</strong> {data.length}
      </header>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#eee' }}>
          <tr>
            <th>Ordre</th>
            <th>Type</th>
            <th>ID Joueur</th>
            <th>Position (X, Y)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((play) => (
            <tr key={play.id}>
              <td>{play.id}</td>
              <td>{play.type}</td>
              <td>{play.playerId}</td>
              <td>{play.x}, {play.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;