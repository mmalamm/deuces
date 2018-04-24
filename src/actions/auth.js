import { auth, googleAuthProvider, githubAuthProvider } from "../fire";
import { addUser } from "./users";

export const signInWithGoogle = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.signInWithRedirect(googleAuthProvider);
  };
};
export const signInWithGithub = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.signInWithRedirect(githubAuthProvider);
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.signOut();
  };
};

const signedIn = user => {
  return {
    type: "SIGN_IN",
    payload: {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid
    }
  };
};

const signedOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const startListeningToAuthChanges = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(signedIn(user));
        dispatch(addUser(user));
      } else {
        dispatch(signedOut());
      }
    });
  };
};
