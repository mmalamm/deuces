// user creates game

// game is created to _games database

// gameDigest is pushed to all associated players

// const dbRef = admin.database().ref;
// const keyify = uname => uname.toLowerCase();
// const _usersRef = dbRef("_users");
// const usersRef = dbRef("users");
const _gamesRef = dbRef("_games");
const openGamesRef = dbRef("openGames");
// const getUidFromToken = idToken =>
//   new Promise((resolve, reject) => {
//     admin
//       .auth()
//       .verifyIdToken(idToken)
//       .then(token => {
//         resolve(token.uid);
//       })
//       .catch(err => reject(err));
//   });

// const getUsernameFromUid = uid =>
//   new Promise((resolve, reject) => {
//     dbRef(`_users/${uid}/username`).once("value", snapshot => {
//       const username = snapshot.val();
//       username ? resolve(username) : reject(new Error("username not found"));
//     });
//   });

// const getUserFromUsername = uName =>
//   new Promise((resolve, reject) => {
//     usersRef.child(keyify(uName)).once("value", snapshot => {
//       const user = snapshot.val();
//       user ? resolve(user) : reject(new Error("user not found"));
//     });
//   });
const makeGameAndGetKey = game =>
  /// refactor this
  new Promise((resolve, reject) => {
    _gamesRef
      .push(game)
      .then(gameRef => {
        const gameKey = gameRef.path.pieces_[1];
        _gamesRef
          .child(gameKey)
          .child("gameKey")
          .set(gameKey)
          .then(() => {
            resolve(gameKey);
          });
      })
      .catch(e => reject(e));
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
      });
  });
};

const createGameDigestFromGame = game => {
  switch (game.gameStatus) {
    case "NEW_GAME":
      return {
        gameStatus, // new_game, match_started, match_ended, game_ended
        players, // username, photourl, score, position
        currentMatchStatus: null
      };
    case "MATCH_STARTED":
      return {
        gameStatus,
        players,
        currentMatchStatus: createMatchStatusFromMatch(game.currentMatch)
      };
    default:
      return null;
  }
};

const addPlayerToGame = async (playerUid, gameKey) => {
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
  const gameSnapshot = await _gameRef.once("value");
  const game = gameSnapshot.val();
  const p1 = playersRef.child(playerUid).set(player);
  const p2 = usersRef
    .child(keyify(username))
    .child(playerUid)
    .child("games")
    .child(gameKey)
    .set(createGameDigestFromGame(game));
  return Promise.all([p1, p2]);
};

const createGameFn = async (req, res) => {
  const { idToken, gameName, inviteOnly = false, invites = null } = req.body;

  const uid = await getUidFromToken(idToken);
  const username = await getUsernameFromUid(uid);
  const user = await getUserFromUsername(username);
  const { photoURL } = user.public;
  //first let's create the game and add it to the _games
  const game = {
    gameName,
    ownerUid: uid,
    gameStatus: "NEW_GAME",
    inviteOnly,
    invites
  };
  const gameKey = await makeGameAndGetKey(game);

  /// invites logic

  // now we push the gameDigest to players (only p1)
  // because this is the create game function
  await addPlayerToGame(uid, gameKey);
};

/*
_gameShape = {
  gameName
  owner
  players
  gameStatus
  inviteOnly
  gamKey
  currentMatch,
  matches
  invites
}

gameDigestShape = {
  players <object>
  gameStatus <string>
  currentMatch <object>
}
*/
