import { db, getUserFromUsername, keyify, getUidFromUsername } from "../admin";

interface Player {
  photoURL: string;
  position: number;
  username: string;
}
interface _player {
  photoURL: string;
  position: number;
  username: string;
  uid: string;
}
interface gameDigest {}
interface _invite {
  username: string;
  uid: string;
  status: string;
}

export interface _game {
  gameName: string;
  owner: {
    uid: string;
    username: string;
  };
  gameStatus: "NEW_GAME" | "MATCH_STARTED" | "MATCH_ENDED";
  inviteOnly: boolean;
  invites?: _invite[];
  gameKey?: string;
  players?: _player[];
  currentMatch?;
}

const _gamesRef = db.ref("_games");
const openGamesRef = db.ref("openGames");

const checkInvite = (game: _game, playerUid: string): boolean =>
  !!game.invites.map(i => i.uid).find(uid => uid === playerUid);

const makeInvitesFromUsernames = async (
  invitedUsernames: string[]
): Promise<_invite[]> =>
  new Promise<_invite[]>(async (resolve, reject) => {
    console.log("inviting the following users:", invitedUsernames);
    const promises = invitedUsernames.map(u => getUidFromUsername(u));
    const uids = await Promise.all(promises);
    const invites: _invite[] = uids.map((uid, i) => ({
      uid,
      username: invitedUsernames[i],
      status: "PENDING"
    }));
    console.log("invites created:", invites);
    resolve(invites);
  });

const deleteInviteFromUsername = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const playerUid = await getUidFromUsername(username);
  const inviteRef = db.ref(
    `users/${keyify(username)}/${playerUid}/invites/${gameKey}`
  );
  return new Promise((resolve, reject) => {
    inviteRef
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

const delete_gameFromGamekey = (gameKey: string): Promise<{}> =>
  new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => reject(reason));
  });

const deleteGamerefFromUsername = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const playerUid = await getUidFromUsername(username);
  const gameRef = db.ref(
    `users/${keyify(username)}/${playerUid}/games/${gameKey}`
  );
  return new Promise((resolve, reject) => {
    gameRef
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

const deleteOpengameFromGamekey = (gameKey: string): Promise<{}> =>
  new Promise((resolve, reject) => {
    openGamesRef
      .child(gameKey)
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => reject(reason));
  });

const get_gameFromGameKey = (gameKey: string): Promise<_game> =>
  new Promise((resolve, reject) => {
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
      .catch(reason => reject(reason));
  });

const deleteGamerefsFromUsernames = (
  usernames: string[],
  gameKey: string
): Promise<{}>[] => {
  return usernames.map(u => {
    const p1 = deleteGamerefFromUsername(u, gameKey);
    const p2 = deleteInviteFromUsername(u, gameKey);
    return Promise.all([p1, p2]);
  });
};

const make_gameAndGetKey = (game): Promise<string> =>
  /// refactor this
  new Promise((resolve, reject) => {
    _gamesRef.push(game).then(gameRef => {
      const gameKey = gameRef.path.pieces_[1];
      _gamesRef
        .child(gameKey)
        .child("gameKey")
        .set(gameKey)
        .then(() => {
          console.log(`game ${gameKey} made:`, game);
          resolve(gameKey);
        })
        .catch(reason => reject(reason));
    });
  });

const getNextPositionFromGamekey = (gameKey: string): Promise<number> =>
  new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .child("players")
      .once("value")
      .then(snapshot => {
        const players = snapshot.val();
        const position = players
          ? Math.max(...Object.keys(players).map(k => players[k].position)) + 1
          : 0;
        resolve(position);
      })
      .catch(reason => reject(reason));
  });

const digestPlayers = (playersObj: {}): Player[] =>
  Object.keys(playersObj || {})
    .map(k => {
      const { photoURL, position, username } = playersObj[k];
      return { photoURL, position, username };
    })
    .sort((a, b) => a.position - b.position);

const createGameDigestFrom_game = (game: _game): gameDigest => {
  switch (game.gameStatus) {
    case "NEW_GAME":
      return {
        gameStatus: "NEW_GAME", // new_game, match_started, match_ended, game_ended
        // players, // username, photourl, score, position
        gameKey: game.gameKey,
        gameName: game.gameName,
        gameOwner: game.owner.username,
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

const removeInviteFrom_game = (gameKey: string, uid: string): Promise<null> => {
  return new Promise(async (resolve, reject) => {
    const invitesRef = db.ref(`_games/${gameKey}/invites`);
    const oldInvites: _invite[] = await invitesRef.once("value");
    const newInvites: _invite[] = oldInvites.filter(i => i.uid !== uid);
    invitesRef
      .set(newInvites)
      .then(() => resolve())
      .catch(reason => reject(reason));
  });
};

const updateDigests = (gameKey: string): Promise<{}> =>
  new Promise(async (resolve, reject) => {
    // need to update all digests
    // invites and games
    const thisGame = await get_gameFromGameKey(gameKey);
    const invitesPromise = sendInvites(gameKey, thisGame.invites);
    // working on this still
    const gameRefsPromises = Object.keys(thisGame.players)
      .map(uid => thisGame.players[uid])
      .map(p => p.username)
      .map(u => updateUserDigest(u, gameKey));

    return Promise.all([invitesPromise, ...gameRefsPromises])
      .then(() => resolve())
      .catch(reason => reject(reason));
  });

const updateUserDigest = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const uid = await getUidFromUsername(username);
  const game = await get_gameFromGameKey(gameKey);
  return new Promise((resolve, reject) => {
    db.ref(`users/${keyify(username)}/${uid}/games/${gameKey}`)
      .set(createGameDigestFrom_game(game))
      .then(() => resolve())
      .catch(reason => reject(reason));
  });
};

const sendInvites = async (
  gameKey: string,
  invites: _invite[]
): Promise<void[]> => {
  // add an invite for this game to each player's invites node
  const game = await get_gameFromGameKey(gameKey);
  const digest = createGameDigestFrom_game(game);
  console.log("sending invites...");
  return Promise.all(
    invites.map(({ username, uid }) => {
      console.log(`sending invite for game ${gameKey} to ${username}...`);
      return db
        .ref(`users/${keyify(username)}/${uid}/invites/${gameKey}`)
        .set(digest);
    })
  );
};

export {
  addGameToOpenGames,
  addPlayerToGame,
  checkInvite,
  get_gameFromGameKey,
  makeInvitesFromUsernames,
  make_gameAndGetKey,
  sendInvites,
  deleteGamerefFromUsername,
  deleteInviteFromUsername,
  deleteGamerefsFromUsernames,
  deleteOpengameFromGamekey,
  delete_gameFromGamekey
};
