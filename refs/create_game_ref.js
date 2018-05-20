// user creates game

// game is created to _games database

// gameDigest is pushed to all associated players

const dbRef = admin.database().ref;
const keyify = uname => uname.toLowerCase();

const getUidFromToken = idToken =>
  new Promise((resolve, reject) => {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(token => {
        resolve(token.uid);
      })
      .catch(err => reject(err));
  });

const getUsernameFromUid = uid =>
  new Promise((resolve, reject) => {
    dbRef(`_users/${uid}/username`).once("value", snapshot => {
      const username = snapshot.val();
      username ? resolve(username) : reject(new Error("username not found"));
    });
  });

const getUserFromUsername = uName =>
  new Promise((resolve, reject) => {
    usersRef.child(keyify(uName)).once("value", snapshot => {
      const user = snapshot.val();
      user ? resolve(user) : reject(new Error("user not found"));
    });
  });

const _usersRef = dbRef("_users");
const usersRef = dbRef("users");
const _gamesRef = dbRef("_games");
const openGamesRef = dbRef("openGames");

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
    players: {
      [uid]: {
        position: 0,
        username,
        photoURL,
        uid
      }
    },
    gameStatus: "NEW_GAME",
    inviteOnly,
    matches: {},
    currentMatch
  };
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
