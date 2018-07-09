import { getUidFromToken } from "../admin";
import { get_gameFromGameKey } from "./gameLib";

const createGameFn = async (req, res) => {
  const { uid } = req;
  const { gameKey } = req.body;

  const gameToDelete = await get_gameFromGameKey(gameKey);
  // to delete a game, we gotta delete the hidden reference,
  // player references (like invites and gamereferences)
  // and open_game reference (if its an open game)

  // also we gotta make sure the game belongs to whoever trying to delete it
  // and that it can only be deleted if the game didnt start yet

  res.send("Game deleted");
};

export default createGameFn;
