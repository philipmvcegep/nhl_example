// src/pages/Game.jsx
import React, { useState, useEffect } from 'react';
import { GameService } from '../api/GameService.jsx'; // Note le ../ pour remonter d'un dossier
import ShotTable from '../components/Game/ShotTable/ShotTable.jsx';

export const Game = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const {shots} = await GameService.getGameShots();
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
        <div className="error-box">
            <h3>Erreur de récupération</h3>
            <p>{error}</p>
        </div>
    );

    return (
        <div>
            <header style={{ marginBottom: '20px' }}>
                <strong>Événements trouvés :</strong> {data.length}
            </header>
            <ShotTable plays={data} />
        </div>
    );
};