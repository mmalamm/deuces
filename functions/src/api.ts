const express = require("express");
const cors = require("cors");
import admin from "./admin";

const app = express();

// i have the username and uid of the user on the request
// i need to:
// 1) add username to _users table
// 2) add username to users/public and store photoURL
// 3) add username to users/private and store uid

app.use(cors());
app.post("/init_user", async (req, res) => {
  const { idToken, username } = req.body;
  const token = await admin.auth().verifyIdToken(idToken);
  // enter backend validations on username, idToken ///
  // enter error handling on username, idToken ///
  const uid = token.uid;

  const _userRef = admin.database().ref(`/_users/${uid}`);
  const snapshot = await _userRef.once("value");
  const { email, displayName, photoURL, points } = snapshot.val();
  const userRef = admin.database().ref(`/users/${username}`);
  const p1 = _userRef.child("username").set(username);
  const p2 = userRef.child("public").set({ photoURL });
  const p3 = userRef.child("private").set({ uid });

  Promise.all([p1, p2, p3]).then(() => {
    res.json({ email, displayName, photoURL, uid, username, points });
  });
});

export default app;
