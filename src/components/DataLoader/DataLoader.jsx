import React, { useState, useEffect } from 'react';
import './DataLoader.css';

export default function DataLoader(props) {
  const [compiledData, setCompiledData] = useState([]);
  const [loading, setLoading] = useState(true);

  const playerMap = {
    8481540: "Cole Caufield",
    8480830: "Nick Suzuki",
    8483515: "Juraj Slafkovsky",
    8484153: "Lane Hutson"
  };

  useEffect(function () {
    const GAME_ID = 2025021248; 
    const PROXY = "https://api.allorigins.win/raw?url=";
    const API_URL = `https://api-web.nhle.com/v1/gamecenter/${GAME_ID}/play-by-play`;

    fetch(PROXY + encodeURIComponent(API_URL))
      .then(res => res.json())
      .then(data => {
        const shots = data.plays
          .filter(play => ['shot', 'goal', 'missed-shot'].includes(play.typeDescKey))
          .map(play => ({
            id: play.sortOrder,
            type: play.typeDescKey.toUpperCase(),
            period: play.period,
            time: play.timeInPeriod,
            player: playerMap[play.details?.shootingPlayerId] || "Autre",
            x: play.details?.xCoord,
            y: play.details?.yCoord
          }));

        setCompiledData(shots);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Compilation des données de tirs...</p>
    </div>
  );

  // LOGIQUE DE FILTRE : On filtre la liste selon le joueur sélectionné dans App.jsx
  const filteredShots = compiledData.filter(shot => {
    return !props.selectedPlayer || shot.player === props.selectedPlayer;
  });

  return (
    <div className="data-table-container">
      <div className="table-header">
        <h2>Rapport de tirs : {props.selectedPlayer || "Équipe complète"}</h2>
        <span className="badge">{filteredShots.length} tirs</span>
      </div>

      <table className="shot-table">
        <thead>
          <tr>
            <th>Période</th>
            <th>Temps</th>
            <th>Joueur</th>
            <th>Type</th>
            <th>Coord X</th>
            <th>Coord Y</th>
          </tr>
        </thead>
        <tbody>
          {filteredShots.map(shot => (
            <tr key={shot.id} className={shot.type === 'GOAL' ? 'goal-row' : ''}>
              <td>{shot.period}</td>
              <td>{shot.time}</td>
              <td><strong>{shot.player}</strong></td>
              <td>{shot.type}</td>
              <td>{shot.x}</td>
              <td>{shot.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}