import { db, getUsernameFromUid, getUserFromUsername, keyify } from "../admin";

// const _gamesRef = dbRef("_games");
// const openGamesRef = dbRef("openGames");

const _gamesRef = db.ref("_games");
const openGamesRef = db.ref("openGames");

const getGameFromGameKey = (gameKey: string) => {
  return new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .once("value", snapshot => {
        const game = snapshot.val();
        if (game) {
          resolve(game);
        } else {
          reject(new Error("game not found"));
        }
      })
      .catch(e => console.error(e));
  });
};

export const makeGameAndGetKey = (game): Promise<string> =>
  /// refactor this
  new Promise((resolve, reject) => {
    _gamesRef.push(game).then(gameRef => {
      const gameKey = gameRef.path.pieces_[1];
      _gamesRef
        .child(gameKey)
        .child("gameKey")
        .set(gameKey)
        .then(() => {
          resolve(gameKey);
        })
        .catch(e => console.error(e));
    });
  });

const getNextPositionFromGamekey = gameKey => {
  return new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .child("players")
      .once("value")
      .then(snapshot => {
        const players = snapshot.val();
        resolve(
          players
            ? Math.max(...Object.keys(players).map(k => players[k].position)) +
              1
            : 0
        );
      })
      .catch(e => console.error(e));
  });
};

interface Player {
  photoURL: string;
  position: number;
  username: string;
}

export interface _game {
  gameName: string;
  ownerUid: string;
  gameStatus: "NEW_GAME" | "MATCH_STARTED" | "MATCH_ENDED";
  inviteOnly: boolean;
  invites?;
  gameKey?: string;
}

const digestPlayers = (playersObj): Player[] => {
  console.log(playersObj);

  return Object.keys(playersObj)
    .map(k => {
      const { photoURL, position, username } = playersObj[k];
      return { photoURL, position, username };
    })
    .sort((a, b) => a.position - b.position);
};

const createGameDigestFromGame = game => {
  switch (game.gameStatus) {
    case "NEW_GAME":
      return {
        gameStatus: "NEW_GAME", // new_game, match_started, match_ended, game_ended
        // players, // username, photourl, score, position
        gameKey: game.gameKey,
        gameName: game.gameName,
        inviteOnly: game.inviteOnly,
        players: digestPlayers(game.players),
        currentMatchStatus: null
      };
    case "MATCH_STARTED":
      return {
        gameStatus: "MATCH_IN_PROGRESS"
        // players,
        ///currentMatchStatus: createMatchStatusFromMatch(game.currentMatch)
      };
    default:
      return null;
  }
};

export const addGameToOpenGames = async (gameKey: string) =>
  new Promise(async (resolve, reject) => {
    const game = await getGameFromGameKey(gameKey);
    const gameDigest = createGameDigestFromGame(game);
    await openGamesRef.child(gameKey).set(gameDigest);
    resolve({ [gameKey]: gameDigest });
  });

export const addPlayerToGame = async (playerUid, gameKey) => {
  /// refactor this
  const _gameRef = _gamesRef.child(gameKey);
  const playersRef = _gameRef.child("players");
  const username = await getUsernameFromUid(playerUid);
  const user = await getUserFromUsername(username);
  const { photoURL } = user.public;
  const position = await getNextPositionFromGamekey(gameKey);
  const player = {
    position,
    username,
    photoURL,
    uid: playerUid
  };
  await playersRef.child(playerUid).set(player);
  const gameSnapshot = await _gameRef.once("value");
  const game = gameSnapshot.val();
  const p2 = db
    .ref("users")
    .child(keyify(username))
    .child(playerUid)
    .child("games")
    .child(gameKey)
    .set(createGameDigestFromGame(game));
  await Promise.all([p2]);
};
