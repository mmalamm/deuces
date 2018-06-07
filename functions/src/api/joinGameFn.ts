import { get_gameFromGameKey, checkInvite, addPlayerToGame } from "./gameLib";
import { getUidFromToken } from "../admin";

//

const joinGameFn = async (req, res) => {
  const { idToken, gameKey } = req.body;

  const uid = await getUidFromToken(idToken);
  const game = await get_gameFromGameKey(gameKey);

  // make sure user can join game:
  // - if the game is not invite only
  // - if the game has the player in the invites
  if (!game.inviteOnly || checkInvite(game, uid)) {
    await addPlayerToGame(uid, game.gameKey);
    res.json(game);
  } else {
    res.status(428).send('User not allowed in game');
  }
};

export default joinGameFn;