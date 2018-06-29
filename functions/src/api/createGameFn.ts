import { getUidFromToken } from "../admin";
import {
  makeGameAndGetKey,
  addPlayerToGame,
  addGameToOpenGames,
  makeInvitesFromUsernames,
  sendInvites,
  _game
} from "./gameLib";

const createGameFn = async (req, res) => {
  const { idToken, gameName, inviteOnly, invitedUsernames } = req.body;

  /// validations
  /// if invite only, there must be at least 3 invites
  if (inviteOnly && invitedUsernames.length < 3)
    return res
      .status(428)
      .send('Invite Only games require at least three invites');

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
  await sendInvites(gameKey, invites);
  // now we push the gameDigest to players (only p1)
  // because this is the create game function
  await addPlayerToGame(uid, gameKey);
  if (!inviteOnly) {
    await addGameToOpenGames(gameKey);
  }

  res.send("Game created");
};

export default createGameFn;
