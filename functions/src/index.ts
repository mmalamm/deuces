import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const newUser = functions.auth
  .user()
  .onCreate(({ displayName, photoURL, uid, email }) => {
    console.log("new user logging in:", displayName, email);
    return Promise.all([
      admin
        .database()
        .ref(`/users/${uid}`)
        .set({ displayName, photoURL, uid, points: 500 })
    ]).catch(e => console.error(e));
  });

export const deleteUser = functions.auth.user().onDelete(e => {
  console.log("deleting user:", e.displayName, e.email);
  return Promise.all([
    admin
      .database()
      .ref(`/users/${e.uid}`)
      .set(null)
  ]).catch(err => console.error(err));
});

export const createGame = functions.https.onRequest((req, res) => {
  console.log(req);
  admin
    .database()
    .ref("games")
    .push("ayyyy")
    .then(e => {
      console.log(e);
      res.status(200).json({ hello: "world" });
    });
});
