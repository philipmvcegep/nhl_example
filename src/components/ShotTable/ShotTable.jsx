import React from 'react';

// Composant pur : Données en entrée -> UI en sortie
const  ShotTable = function({ plays }){
  if (plays.length === 0) return <p>Aucune donnée disponible pour ce match.</p>;

  return (
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
        {plays.map((play) => (
          <tr key={play.id}>
            <td>{play.id}</td>
            <td style={{ fontWeight: play.type === 'goal' ? 'bold' : 'normal' }}>
              {play.type} {play.type === 'goal' ? '🚨' : ''}
            </td>
            <td>{play.playerId}</td>
            <td>{play.x}, {play.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShotTable;