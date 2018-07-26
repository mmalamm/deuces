import {
  get_gameFromGameKey,
  deleteGamerefsFromUsernames,
  deleteOpengameFromGamekey,
  delete_gameFromGamekey
} from "./gameLib";

import { RequestHandler } from "express";

const deleteGameFn: RequestHandler = async (req, res) => {
  const { gameKey, uid } = req.body;

  const gameToDelete = await get_gameFromGameKey(gameKey);
  console.log(gameToDelete);
  const { players, invites } = gameToDelete;

  if (gameToDelete.gameStatus !== "NEW_GAME") {
    return res
      .status(400)
      .send("You can only delete games that have not yet started");
  }
  if (uid !== gameToDelete.owner.uid) {
    return res.status(401).send("You can only delete a game that you created");
  }

  const joinedPlayers = Object.keys(players).map(
    uidKey => players[uidKey].username
  );
  const invitedPlayers = invites ? invites.map(i => i.username) : [];

  const playerGamerefDeletionPromises = deleteGamerefsFromUsernames(
    [...joinedPlayers, ...invitedPlayers],
    gameKey
  );

  const opengamesDeletionPromise = !gameToDelete.inviteOnly
    ? [deleteOpengameFromGamekey(gameKey)]
    : [];
  const _gameDeletionPromise = [delete_gameFromGamekey(gameKey)];

  return Promise.all([
    ...playerGamerefDeletionPromises,
    opengamesDeletionPromise,
    _gameDeletionPromise
  ])
    .then(() => {
      res.send("Game deleted");
    })
    .catch(() => {
      res.status(500).send("Something went wrong");
    });
};

export default deleteGameFn;
