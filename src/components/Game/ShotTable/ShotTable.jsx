import React from 'react';
import './ShotTable.css';

// Composant pur : Données en entrée -> UI en sortie
const ShotTable = function ({ plays }) {
  if (plays.length === 0) return <p>Aucune donnée disponible pour ce match.</p>;

  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead >
        <tr>
          <th>Ordre</th>
          <th>Type</th>
          <th>ID Joueur</th>
          <th>Position (X, Y)</th>
        </tr>
      </thead>
      <tbody>
        {plays.map((play) => (
          <tr key={play.id} className={play.type === 'goal' ? 'row-goal' : ''}>
            <td><strong>#{play.id}</strong></td>
            <td>
              <span className={`badge badge-${play.type === 'goal' ? 'goal' : 'shot'}`}>
                {play.type === 'goal' ? '🚨 GOAL' : play.type.replace('-shot', '')}
              </span>
            </td>
            <td>Joueur {play.playerId}</td>
            <td className="coords-text">
              <span className="coord-badge">X: {play.x}, </span>
              <span className="coord-badge">Y: {play.y}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShotTable;