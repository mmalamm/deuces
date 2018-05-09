import firebase from "firebase";

const config = {
  apiKey: "AIzaSyARgympLMBRWck364sTd6oIlwbCWvhq2CE",
  authDomain: "deuces-bovinecorvus.firebaseapp.com",
  databaseURL: "https://deuces-bovinecorvus.firebaseio.com",
  projectId: "deuces-bovinecorvus",
  storageBucket: "deuces-bovinecorvus.appspot.com",
  messagingSenderId: "769484438430"
};

firebase.initializeApp(config);

///
window.fire = firebase;
///

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
