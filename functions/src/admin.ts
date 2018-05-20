import * as admin from "firebase-admin";

admin.initializeApp();

const dbRef = admin.database().ref

const _usersRef = dbRef('_users');
const usersRef = dbRef('users');
const _gamesRef = dbRef('_games');
const openGamesRef = dbRef('openGames');

const getUidFromToken = idToken => {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(idToken).then(token => {
      resolve(token.uid);
    })
  })
}

export default admin;