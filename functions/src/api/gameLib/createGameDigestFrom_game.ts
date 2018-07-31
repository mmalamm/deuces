import { _game, gameDigest } from "./interfaces";
import digestPlayers from "./digestPlayers";

const createGameDigestFrom_game = (game: _game): gameDigest => {
  switch (game.gameStatus) {
    case "NEW_GAME":
      return {
        gameStatus: "NEW_GAME", // new_game, match_started, match_ended, game_ended
        // players, // username, photourl, score, position
        gameKey: game.gameKey,
        gameName: game.gameName,
        gameOwner: game.owner.username,
        inviteOnly: game.inviteOnly,
        players: digestPlayers(game.players),
        currentMatchStatus: null
      };
    case "MATCH_STARTED":
      return {
        gameStatus: "MATCH_IN_PROGRESS"
        // players,
        ///currentMatchStatus: createMatchStatusFromMatch(game.currentMatch)
      };
    default:
      return null;
  }
};

export default createGameDigestFrom_game;
