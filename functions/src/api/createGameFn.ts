import { getUidFromToken } from "../admin";
import {
  makeGameAndGetKey,
  addPlayerToGame,
  addGameToOpenGames,
  makeInvitesFromUsernames,
  _game
} from "./gameLib";

const createGameFn = async (req, res) => {
  const { idToken, gameName, inviteOnly, invitedUsernames } = req.body;
  console.log("create game fn hit!");
  const uid = await getUidFromToken(idToken);
  const invites = await makeInvitesFromUsernames(invitedUsernames);
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
  console.log("INVITTTTTT::", invitedUsernames);
  if (inviteOnly) {
    await addGameToOpenGames(gameKey);
  }

  res.send("Game created");
};

export default createGameFn;
