import {
  make_gameAndGetKey,
  addPlayerToGame,
  addGameToOpenGames,
  makeInvitesFromUsernames,
  sendInvites,
  _game
} from "./gameLib";

import { RequestHandler } from "express";

import { getUsernameFromUid } from "../admin";

const createGameFn: RequestHandler = async (req, res) => {
  const { gameName, inviteOnly, invitedUsernames, uid } = req.body;
  const username = await getUsernameFromUid(uid);

  /// validations
  /// if invite only, there must be at least 3 invites
  if (inviteOnly && invitedUsernames.length < 3) {
    return res
      .status(428)
      .send("Invite Only games require at least three invites");
  }

  const invites = await makeInvitesFromUsernames(invitedUsernames);
  //first let's create the game and add it to the _games
  const game: _game = {
    gameName,
    owner: { uid, username },
    gameStatus: "NEW_GAME",
    inviteOnly,
    invites
  };

  const gameKey = await make_gameAndGetKey(game);

  /// invites logic
  await sendInvites(gameKey, invites);
  console.log("sent invites:", invites);
  // now we push the gameDigest to players (only p1)
  // because this is the create game function
  await addPlayerToGame({ uid, username }, gameKey);
  if (!inviteOnly) {
    await addGameToOpenGames(gameKey);
  }

  return res.send("Game created");
};

export default createGameFn;
