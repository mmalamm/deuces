import get_gameFromGameKey from "./get_gameFromGameKey";
import createGameDigestFrom_game from "./createGameDigestFrom_game";

import { db } from "../../admin";

const openGamesRef = db.ref("openGames");

const addGameToOpenGames = (gameKey: string) =>
  new Promise(async (resolve, reject) => {
    const game = await get_gameFromGameKey(gameKey);
    const digest = createGameDigestFrom_game(game);
    await openGamesRef.child(gameKey).set(digest);
    resolve({ [gameKey]: digest });
  });

export default addGameToOpenGames;
