import {
  get_gameFromGameKey,
  deleteGamerefsFromUsernames,
  deleteOpengameFromGamekey,
  delete_gameFromGamekey
} from "./gameLib";

const deleteGameFn = async (req, res) => {
  const { uid } = req;
  const { gameKey } = req.body;

  const gameToDelete = await get_gameFromGameKey(gameKey);
  console.log(gameToDelete);

  if (gameToDelete.gameStatus !== "NEW_GAME") {
    return res
      .status(400)
      .send("You can only delete games that have not yet started");
  }
  if (uid !== gameToDelete.owner.uid) {
    return res.status(401).send("You can only delete a game that you created");
  }

  const joinedPlayers = Object.keys(gameToDelete.players).map(
    uid => gameToDelete.players[uid].username
  );
  const invitedPlayers = gameToDelete.invites.map(i => i.username);

  const playerGamerefDeletionPromises = deleteGamerefsFromUsernames(
    [...joinedPlayers, ...invitedPlayers],
    gameKey
  );

  const opengamesDeletionPromise = !gameToDelete.inviteOnly
    ? [deleteOpengameFromGamekey(gameKey)]
    : [];
  const _gameDeletionPromise = [delete_gameFromGamekey(gameKey)];

  Promise.all([
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