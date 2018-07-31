import { Player } from "./interfaces";

const digestPlayers = (playersObj: {}): Player[] =>
  Object.keys(playersObj || {})
    .map(k => {
      const { photoURL, position, username } = playersObj[k];
      return { photoURL, position, username };
    })
    .sort((a, b) => a.position - b.position);

export default digestPlayers;
