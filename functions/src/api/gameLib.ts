import {
  db,
  getUsernameFromUid,
  getUserFromUsername,
  keyify,
  getUidFromUsername
} from "../admin";

interface Player {
  photoURL: string;
  position: 0 | 1 | 2 | 3;
  username: string;
}

interface _invite {
  username: string;
  uid: string;
  status: "ACCEPTED" | "PENDING" | "REJECTED";
}

export interface _game {
  gameName: string;
  ownerUid: string;
  gameStatus: "NEW_GAME" | "MATCH_STARTED" | "MATCH_ENDED";
  inviteOnly: boolean;
  invites?: _invite[];
  gameKey?: string;
  players?;
  currentMatch?;
}

const _gamesRef = db.ref("_games");
const openGamesRef = db.ref("openGames");

const checkInvite = (game: _game, playerUid: string): boolean =>
  !!game.invites.map(i => i.uid).find(uid => uid === playerUid);

// skills that pay the bills
const makeInvitesFromUsernames = async (
  invitedUsernames: string[]
): Promise<_invite[]> =>
  new Promise<_invite[]>(async (resolve, reject) => {
    const promises = invitedUsernames.map(u => getUidFromUsername(u));
    const uids = await Promise.all(promises);
    const invites: _invite[] = uids.map(
      (uid, i) =>
        ({
          uid,
          username: invitedUsernames[i],
          status: "PENDING"
        } as _invite)
    );
    resolve(invites);
  });

const get_gameFromGameKey = (gameKey: string): Promise<_game> => {
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

const makeGameAndGetKey = (game): Promise<string> =>
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

const getNextPositionFromGamekey = gameKey =>
  new Promise((resolve, reject) => {
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

const digestPlayers = (playersObj: {}): Player[] =>
  Object.keys(playersObj || {})
    .map(k => {
      const { photoURL, position, username } = playersObj[k];
      return { photoURL, position, username };
    })
    .sort((a, b) => a.position - b.position);

const createGameDigestFrom_game = (game: _game) => {
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

const addGameToOpenGames = (gameKey: string) =>
  new Promise(async (resolve, reject) => {
    const game = await get_gameFromGameKey(gameKey);
    const digest = createGameDigestFrom_game(game);
    await openGamesRef.child(gameKey).set(digest);
    resolve({ [gameKey]: digest });
  });

const addPlayerToGame = async (playerUid, gameKey) => {
  /// refactor this
  /// need to create updateDigests function
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
  // add player to _game.players
  await playersRef.child(playerUid).set(player);
  // add gameDigest to users.{username}.{uid}.games.{gameKey}
  const gameSnapshot = await _gameRef.once("value");
  const game = gameSnapshot.val();

  const p2 = db
    .ref(`users/${keyify(username)}/${playerUid}/games/${gameKey}`)
    .set(createGameDigestFrom_game(game));
  await Promise.all([p2]);
};

const sendInvites = async (
  gameKey: string,
  invites: _invite[]
): Promise<void[]> => {
  // add an invite for this game to each player's invites node
  const game = await get_gameFromGameKey(gameKey);
  const digest = createGameDigestFrom_game(game);
  return Promise.all(
    invites.map(async ({ username, uid, status }) =>
      db.ref(`users/${keyify(username)}/${uid}/invites/${gameKey}`).set(digest)
    )
  );
};

export {
  addGameToOpenGames,
  addPlayerToGame,
  checkInvite,
  get_gameFromGameKey,
  makeInvitesFromUsernames,
  makeGameAndGetKey,
  sendInvites
};
