app.post("/init_user", async (req, res) => {
  const { idToken, username } = req.body;
  const usernameKey = username.replace(/\s/g, "").toLowerCase();
  const token = await admin.auth().verifyIdToken(idToken);
  const uid = token.uid;

  const userRef = admin.database().ref(`/users/${usernameKey}`);
  const userNodeSnapshot = await userRef.once("value");

  if (userNodeSnapshot.val()) {
    return res.status(420).send("username already exists");
  }
  if (!usernameKey.match(/^[a-z0-9]{4,20}$/)) {
    return res.status(430).send("your username sucks");
  }

  const _userRef = admin.database().ref(`/_users/${uid}`);
  const _userNodeSnapshot = await _userRef.once("value");
  const { email, displayName, photoURL, points } = _userNodeSnapshot.val();

  const p1 = _userRef.child("username").set(username);
  const p2 = userRef.child("public").set({ photoURL, username });
  const p3 = userRef.child(uid).set({ uid, usernameKey });
  const p4 = userRef.child("uid").set(uid);

  Promise.all([p1, p2, p3, p4])
    .then(() => {
      res.json({
        email,
        displayName,
        photoURL,
        username,
        points
      });
    })
    .catch(e => {
      res.status(400).send("something went wrong");
    });
});
