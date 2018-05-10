import axios from "axios";

import {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  database
} from "../fire";

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
      uid: user.uid,
      username: user.username,
      points: user.points
    }
  };
};

const signedOut = () => {
  return { type: "SIGN_OUT" };
};

export const submitNewUserForm = formData => {
  console.log(formData);
  const initUserEndpointURL =
    "https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api/init_user";

  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.currentUser.getIdToken(true).then(idToken => {
      axios
        .post(initUserEndpointURL, {
          ...formData,
          idToken
        })
        .then(({ data }) => {
          dispatch(signedIn(data));
        })
        .catch(e => console.log("CAUGHT!!!!!", e));
    });
  };
};

export const updatePhotoURL = url => {
  return dispatch => {
    dispatch({ type: "UPDATE_PHOTO_URL", url });
  };
};

export const startListeningToAuthChanges = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const dbRef = database.ref(`/_users/${user.uid}`);
        const callback = snapshot => {
          dispatch({ type: "ATTEMPTING_LOGIN" });
          const userData = snapshot.val();
          if (userData) {
            dispatch(signedIn(userData));
            dbRef.off("value", callback);
          }
        };
        dbRef.on("value", callback);
      } else {
        dispatch(signedOut());
      }
    });
  };
};
