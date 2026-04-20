const PROXY = "https://api.allorigins.win/raw?url=";
const BASE_STATS_URL = "https://api-web.nhle.com/v1/club-stats/";

export const StatsService = {
    /**
     * Récupère les leaders d'une équipe pour la saison actuelle
     * @param {string} triCode - L'abréviation de l'équipe (ex: 'MTL', 'TBL')
     */
    getSkaterStats: async (triCode = 'MTL') => {
        try {
            const response = await fetch(`${PROXY}${BASE_STATS_URL}${triCode}/now`);
            
            if (!response.ok) throw new Error(`Erreur stats pour ${triCode}`);
            
            const json = await response.json();

            // On transforme pour ne garder que l'essentiel et on trie par points
            return json.skaters
                .sort((a, b) => b.points - a.points)
                .map(s => ({
                    id: s.playerId,
                    firstName: s.firstName.default,
                    lastName: s.lastName.default,
                    position: s.positionCode,
                    gamesPlayed: s.gamesPlayed,
                    goals: s.goals,
                    assists: s.assists,
                    points: s.points,
                    plusMinus: s.plusMinus,
                    faceoffWinPct: (s.faceoffWinPct * 100).toFixed(1) // On met en %
                }));
        } catch (error) {
            console.error("StatsService Error:", error);
            throw error;
        }
    }
};