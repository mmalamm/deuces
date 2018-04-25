import * as functions from "firebase-functions";
import admin from "./admin";

export const initUser = functions.auth
  .user()
  .onCreate(({ displayName, photoURL, uid, email }) => {
    console.log("new user logging in:", displayName, email);
    return Promise.all([
      admin
        .database()
        .ref(`/_users/${uid}`)
        .set({ displayName, photoURL, uid, email })
    ]).catch(e => console.error(e));
  });

export const deleteUser = functions.auth.user().onDelete(e => {
  console.log("deleting user:", e.displayName, e.email);
  return admin
    .database()
    .ref(`/_users/${e.uid}`)
    .set(null);
});

import app from "./api";

export const api = functions.https.onRequest(app);
