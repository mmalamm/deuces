import * as functions from "firebase-functions";
import { db, keyify, getUsernameFromUid } from "./admin";

export const createUser = functions.auth
  .user()
  .onCreate(({ displayName, photoURL, uid, email }) => {
    console.log("new user logging in:", displayName, email);
    return Promise.all([
      db
        .ref(`/_users/${uid}`)
        .set({ displayName, photoURL, uid, email, points: 250 })
    ]).catch(e => console.error(e));
  });

export const deleteUser = functions.auth
  .user()
  .onDelete(async ({ displayName, email, uid }) => {
    console.log("deleting user:", displayName, email);
    const username = await getUsernameFromUid(uid);
    return Promise.all([
      db.ref(`_users/${uid}`).set(null),
      db.ref(`users/${keyify(username)}`).set(null)
    ]).catch(e => console.error(e));
  });

import app from "./api";

export const api = functions.https.onRequest(app);
