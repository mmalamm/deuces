import { db, keyify, getUserFromUsername } from "../../admin";

import { _player } from "./interfaces";

import get_gameFromGameKey from "./get_gameFromGameKey";
import getNextPositionFromGamekey from "./getNextPositionFromGamekey";
import checkInvite from "./checkInvite";
import createGameDigestFrom_game from "./createGameDigestFrom_game";
import updateDigests from "./updateDigests";
import removeInviteFrom_game from "./removeInviteFrom_game";

const _gamesRef = db.ref("_games");

const addPlayerToGame = async (
  player: { uid: string; username: string },
  gameKey
) => {
  const { username, uid } = player;
  /// refactor this
  /// need to create updateDigests function
  console.log(`adding player with UID ${uid} to game ${gameKey}`);
  const _gameRef = _gamesRef.child(gameKey);
  const thisGame = await get_gameFromGameKey(gameKey);
  const playersRef = _gameRef.child("players");
  const user = await getUserFromUsername(username);
  const { photoURL } = user.public;
  const position = await getNextPositionFromGamekey(gameKey);
  const thisPlayer: _player = {
    position,
    username,
    photoURL,
    uid
  };
  // if player is invited, remove invite
  if (checkInvite(thisGame, player.uid)) {
    await removeInviteFrom_game(gameKey, player.uid);
  }
  // add player to _game.players
  await playersRef.child(uid).set(thisPlayer);
  // add gameDigest to users.{username}.{uid}.games.{gameKey}
  const gameSnapshot = await _gameRef.once("value");
  const game = gameSnapshot.val();

  const p2 = db
    .ref(`users/${keyify(username)}/${uid}/games/${gameKey}`)
    .set(createGameDigestFrom_game(game));
  await Promise.all([p2, updateDigests(gameKey)]);
};

export default addPlayerToGame;
