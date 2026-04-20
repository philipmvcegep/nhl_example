import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // LE PROXY : On garde celui-là, c'est le plus propre visuellement
    const PROXY = "https://corsproxy.io/?";
    const API_URL = "https://api-web.nhle.com/v1/gamecenter/2025021248/play-by-play";

    fetch(PROXY + API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Le proxy est saturé (Erreur " + response.status + ")");
        return response.json();
      })
      .then((json) => {
        // ON FILTRE : On garde shots et goals
        const cleanData = json.plays
          .filter(p => p.typeDescKey === 'shot-on-goal' ||  p.typeDescKey === 'blocked-shot' || p.typeDescKey === 'missed-shot' || p.typeDescKey === 'goal')
          .map(p => ({
            id: p.sortOrder,
            type: p.typeDescKey,
            player: p.details?.shootingPlayerId || "Inconnu",
            x: p.details?.xCoord,
            y: p.details?.yCoord
          }));

        setData(cleanData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Habs Live Data Fetch 🏒</h1>

      {loading && <p>Chargement des données NHL...</p>}

      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
          <strong>Erreur :</strong> {error}
          <br />
          <small>Essaye de rafraîchir la page (F5)</small>
        </div>
      )}

      {!loading && !error && (
        <>
          <h3>Tirs compilés : {data.length}</h3>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f4f4f4' }}>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Player ID</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.player}</td>
                  <td>{item.x}</td>
                  <td>{item.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;