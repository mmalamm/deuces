app.post("/create_game", async (req, res) => {
  const { idToken, username, gameName, inviteOnly } = req.body;
  const usernameKey = username.replace(/\s/g, "").toLowerCase();
  const token = await admin.auth().verifyIdToken(idToken);
  const uid = token.uid;
  const _gamesRef = admin.database().ref(`_games`);
  const userRef = admin.database().ref(`/users/${usernameKey}`);
  const userGamesRef = userRef.child(uid).child("games");
  const game = {
    gameName,
    players: {
      [uid]: {
        username
      }
    },
    inviteOnly,
    gameStatus: "NEW_GAME",
    gameKey: ""
  };
  const gameRef = await _gamesRef.push(game);
  const gameKey = gameRef.path.pieces_[1];
  const p1 = _gamesRef
    .child(gameKey)
    .child("gameKey")
    .set(gameKey);
  game.gameKey = gameKey;
  const p2 = userGamesRef.child(gameKey).set(game);
  Promise.all([p1, p2])
    .then(e => {
      console.log(e);
      res.json(game);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: "error happened" });
    });
});
