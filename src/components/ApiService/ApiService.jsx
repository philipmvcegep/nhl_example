const PROXY = "https://corsproxy.io/?";
const GAME_ID = "2025021248";
const BASE_URL = `https://api-web.nhle.com/v1/gamecenter/${GAME_ID}/play-by-play`;

const VALID_PLAY_TYPES = ['shot-on-goal', 'blocked-shot', 'missed-shot', 'goal'];

/**
 * ApiService - Service centralisé pour les données NHL
 */
export const ApiService = {
  
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

      // On s'assure que 'plays' existe avant de mapper
      if (!json.plays) return [];

      return ApiService._transformData(json.plays);
      
    } catch (error) {
      console.error("Erreur lors du fetch NHL:", error);
      throw error; // On laisse le composant gérer l'affichage de l'erreur
    }
  },

  /**
   * Nettoie et formate les données brutes de l'API
   * @private
   */
  _transformData: (plays) => {
    return plays
      .filter(p => VALID_PLAY_TYPES.includes(p.typeDescKey))
      .map(p => ({
        id: p.sortOrder,
        type: p.typeDescKey,
        // On utilise l'opérateur de coalescence nulle (??) pour plus de robustesse
        playerId: p.details?.shootingPlayerId ?? "Inconnu",
        x: p.details?.xCoord ?? 0,
        y: p.details?.yCoord ?? 0
      }));
  }
};