import { get_gameFromGameKey, checkInvite, addPlayerToGame } from "./gameLib";

const joinGameFn = async (req, res) => {
  const { gameKey } = req.body;

  const { uid, username } = req;
  const game = await get_gameFromGameKey(gameKey);

  // make sure user can join game:
  // - if the game is not invite only
  // - if the game has the player in the invites
  if (!game.inviteOnly || checkInvite(game, uid)) {
    await addPlayerToGame({ uid, username }, game.gameKey);
    res.json(game);
  } else {
    res.status(428).send("User not allowed in game");
  }
};

export default joinGameFn;
