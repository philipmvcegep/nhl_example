// 1. REMOVE the PROXY constant. 
// 2. Ensure your BASE_URL matches your vite.config.js target
const GAME_ID = "2025030121";
const BASE_URL = `/nhl-api/v1/gamecenter/${GAME_ID}/play-by-play`;

const VALID_PLAY_TYPES = ['shot-on-goal', 'blocked-shot', 'missed-shot', 'goal'];

export const GameService = {
    getGameShots: async () => {
        try {
            // Fetch directly from the Vite proxy path
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                // If it's a 403 or 404, we catch it here before json() crashes
                const errorBody = await response.text();
                console.error("Détails de l'erreur:", errorBody);
                throw new Error(`Erreur réseau (Statut: ${response.status})`);
            }

            const json = await response.json();

            // Verification to prevent crashes if the API structure changes
            if (!json.homeTeam || !json.awayTeam) {
                throw new Error("Données d'équipes manquantes dans la réponse API");
            }

            const teamsLookup = {
                [json.homeTeam.id]: {
                    abbrev: json.homeTeam.abbrev,
                    logo: json.homeTeam.darkLogo,
                    isHome: true
                },
                [json.awayTeam.id]: {
                    abbrev: json.awayTeam.abbrev,
                    logo: json.awayTeam.darkLogo,
                    isHome: false
                }
            };

            if (!json.plays) return { shots: [], teamsLookup };

            const shots = GameService._transformData(json.plays, teamsLookup);

            return { shots, teamsLookup };

        } catch (error) {
            console.error("Erreur lors du fetch NHL:", error);
            throw error; 
        }
    },

    _transformData: (plays, teamsLookup) => {
        return plays
            .filter(p => VALID_PLAY_TYPES.includes(p.typeDescKey))
            .map(p => {
                const teamId = Number(p.details?.eventOwnerTeamId);
                const teamInfo = teamsLookup[teamId] || { abbrev: '???' };

                return {
                    id: p.sortOrder,
                    type: p.typeDescKey,
                    teamAbbrev: teamInfo.abbrev,
                    teamLogo: teamInfo.logo,
                    playerId: p.details?.scoringPlayerId || p.details?.shootingPlayerId || "Inconnu",
                    x: p.details?.xCoord ?? 0,
                    y: p.details?.yCoord ?? 0
                };
            });
    }
};