import * as admin from "firebase-admin";

admin.initializeApp();

export const db = admin.database();
export const keyify = (uname: string): string => uname.toLowerCase();

interface _user {
  email?: string;
  displayName: string;
  photoURL: string;
  points: number;
  username?: string;
}

export const getUidFromToken = (idToken: string): Promise<string> =>
  new Promise((resolve, reject) => {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(token => {
        const uid: string = token.uid;
        resolve(uid);
      })
      .catch(err => reject(err));
  });

export const getUidFromUsername = (username: string): Promise<string> =>
  new Promise((resolve, reject) => {
    db
      .ref(`users/${keyify(username)}/uid`)
      .once("value", snapshot => {
        const uid: string = snapshot.val();
        resolve(uid);
      })
      .catch(reason => reject(reason));
  });

export const getUsernameFromUid = (uid: string): Promise<string> =>
  new Promise((resolve, reject) => {
    db
      .ref(`_users/${uid}/username`)
      .once("value", snapshot => {
        const username: string = snapshot.val();
        resolve(username);
      })
      .catch(reason => reject(reason));
  });

export const getUserFromUsername = (
  uName: string
): Promise<{ public: { photoURL: string; username: string } }> =>
  new Promise((resolve, reject) => {
    db
      .ref("users")
      .child(keyify(uName))
      .once("value", snapshot => {
        const userObj = snapshot.val();
        resolve(userObj);
      })
      .catch(e => console.error(e));
  });

const get_userFromUid = (uid: string): Promise<_user> =>
  new Promise((resolve, reject) => {
    db
      .ref("_users")
      .child(uid)
      .once("value", snapshot => {
        const _userObj: _user = snapshot.val();
        resolve(_userObj);
      })
      .catch(e => console.error(e));
  });

export const setUsernameAndCreateUser = async (
  username: string,
  uid: string
): Promise<_user> => {
  const { email, displayName, photoURL, points } = await get_userFromUid(uid);
  const userRef = db.ref(`users/${keyify(username)}`);
  const userObj = {
    public: { photoURL, username },
    [uid]: { uid, usernameKey: keyify(username) },
    uid
  };

  const p1 = db.ref(`_users/${uid}/username`).set(username);

  const p2 = userRef.set(userObj);
  const output: _user = {
    email,
    photoURL,
    username,
    points,
    displayName
  };
  return new Promise<_user>((resolve, reject) => {
    Promise.all([p1, p2])
      .then(() => {
        resolve(output);
      })
      .catch(reason => reject(reason));
  });
};
