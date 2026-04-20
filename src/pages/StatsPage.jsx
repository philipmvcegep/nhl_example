import React, { useState, useEffect } from 'react';
import { StatsService } from '../api/StatsService';

export const Stats = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await StatsService.getSkaterStats('MTL');
                setPlayers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) return <div className="status-message">Analyse des performances...</div>;
    if (error) return <div className="error-box">{error}</div>;

    return (
        <div className="stats-page">
            <header className="stats-header">
                <h2>{players[0]?.gamesPlayed <= 5 ? "Stats des Séries" : "Saison Régulière"}</h2>
                <p>Équipe : Canadiens de Montréal</p>
            </header>

            <div className="table-wrapper">
                <table className="nhl-table">
                    <thead>
                        <tr>
                            <th>Joueur</th>
                            <th>Pos</th>
                            <th>PJ</th>
                            <th>B</th>
                            <th>A</th>
                            <th className="highlight">PTS</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(p => (
                            <tr key={p.id}>
                                <td className="player-cell">
                                    <strong>{p.lastName}</strong>, {p.firstName}
                                </td>
                                <td>{p.position}</td>
                                <td>{p.gamesPlayed}</td>
                                <td>{p.goals}</td>
                                <td>{p.assists}</td>
                                <td className="highlight-points">{p.points}</td>
                                <td className={p.plusMinus >= 0 ? 'pos' : 'neg'}>
                                    {p.plusMinus > 0 ? `+${p.plusMinus}` : p.plusMinus}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};