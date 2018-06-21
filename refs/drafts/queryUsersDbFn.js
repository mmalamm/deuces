import firebase from "../../src/fire";

const db = firebase.database();

const queryUsersDbFn = (req, res) => {
  const {input} = req.body;
  /// need to build this out into an endpoint to improve newGameForm UI
  db
    .ref()
    .child("users")
    .orderByKey()
    .startAt(input)
    .endAt(input + "\uf8ff")
    .once("value", ss => {
      const incomingData = ss.val();
      res.json(incomingData)
    });
};

export default queryUsersDbFn;
