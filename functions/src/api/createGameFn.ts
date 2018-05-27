import { getUidFromToken } from "../admin";
import {
  makeGameAndGetKey,
  addPlayerToGame,
  addGameToOpenGames,
  _game
} from "./gameLib";

const createGameFn = async (req, res) => {
  const { idToken, gameName, inviteOnly = false, invites = null } = req.body;

  const uid = await getUidFromToken(idToken);
  //first let's create the game and add it to the _games
  const game: _game = {
    gameName,
    ownerUid: uid,
    gameStatus: "NEW_GAME",
    inviteOnly,
    invites
  };
  const gameKey = await makeGameAndGetKey(game);

  /// invites logic

  // now we push the gameDigest to players (only p1)
  // because this is the create game function
  await addPlayerToGame(uid, gameKey);
  if (!inviteOnly) {
    await addGameToOpenGames(gameKey);
  }

  res.send("Game created");
};

export default createGameFn;
