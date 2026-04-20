const PROXY = "https://corsproxy.io/?";
const GAME_ID = "2025021248";
const BASE_URL = `https://api-web.nhle.com/v1/gamecenter/${GAME_ID}/play-by-play`;

const VALID_PLAY_TYPES = ['shot-on-goal', 'blocked-shot', 'missed-shot', 'goal'];

/**
 * GameService - Service centralisé pour les données NHL
 */
export const GameService = {

    /**
     * Récupère les événements de tir formatés pour le match actuel
     * @returns {Promise<Array>} Liste d'objets 'play' simplifiés
     */
    getGameShots: async () => {
        try {
            const response = await fetch(PROXY + BASE_URL);

            if (!response.ok) {
                throw new Error(`Erreur réseau (Statut: ${response.status})`);
            }

            const json = await response.json();

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

            // On s'assure que 'plays' existe avant de mapper
            if (!json.plays) return [];

            const shots = GameService._transformData(json.plays, teamsLookup);

            return { shots, teamsLookup }; // On retourne les deux !

        } catch (error) {
            console.error("Erreur lors du fetch NHL:", error);
            throw error; // On laisse le composant gérer l'affichage de l'erreur
        }
    },

    /**
     * Nettoie et formate les données brutes de l'API
     * @private (on met _ devant en js ou python pour le simuler)
     */
    _transformData: (plays, teamsLookup) => {
        return plays
            .filter(p => VALID_PLAY_TYPES.includes(p.typeDescKey))
            .map(p => {
                // On force p.eventOwnerTeamId en Number pour matcher les clés du lookup
                const teamId = Number(p.details.eventOwnerTeamId);
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
    }}