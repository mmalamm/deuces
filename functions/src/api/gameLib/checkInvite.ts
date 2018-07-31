import { _game } from "./interfaces";

const checkInvite = (game: _game, playerUid: string): boolean =>
  game.invites
    ? !!game.invites.map(i => i.uid).find(uid => uid === playerUid)
    : false;

export default checkInvite;
