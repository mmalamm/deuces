import * as functions from "firebase-functions";
import admin from "./admin";
const db = admin.database();

export const initUser = functions
  .auth
  .user()
  .onCreate(({displayName, photoURL, uid, email}) => {
    console.log("new user logging in:", displayName, email);
    return Promise
      .all([
      db
        .ref(`/_users/${uid}`)
        .set({displayName, photoURL, uid, email, points: 250})
    ])
      .catch(e => console.error(e));
  });

export const deleteUser = functions
  .auth
  .user()
  .onDelete(async e => {
    console.log("deleting user:", e.displayName, e.email);
    const _userRef = db.ref(`/_users/${e.uid}`);
    const usernameSnapshot = await _userRef
      .child("username")
      .once("value");
    const username = usernameSnapshot.val();
    console.log(username);
    return Promise.all([
      _userRef.set(null),
      db.ref(`users/${username.replace(/\s/g, "").toLowerCase()}`).set(null)
    ]);
  });

export const changeProfilePic = functions
  .storage
  .object()
  .onFinalize(async e => {
    const uid = e
      .name
      .slice(6);
    const publicURL = `${e.selfLink}?alt=media&token=${e.metadata.firebaseStorageDownloadTokens}`;
    console.log('publicURL:::', publicURL);
    const _userRef = db.ref(`/_users/${uid}`);
    const promises = [
      _userRef
        .child('photoURL')
        .set(publicURL)
    ];
    const usernameSnapshot = await _userRef
      .child("username")
      .once("value");
    const username = usernameSnapshot.val();
    if (username) {
      const usernameKey = username
        .replace(/\s/g, "")
        .toLowerCase();
      promises.push(db.ref(`users/${usernameKey}/public`).child('photoURL').set(publicURL))
    }
    return Promise.all(promises);
  });

import app from "./api";

export const api = functions
  .https
  .onRequest(app);
