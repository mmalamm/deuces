import { db } from "../admin";
// import { db } from "./index";
import { Handler } from "express";

const queryUsersFn: Handler = (req, res) => {
  const { input, uid } = req.body;
  /// need to build this out into an endpoint to improve newGameForm UI
  db
    .ref()
    .child("users")
    .orderByKey()
    .startAt(input)
    .endAt(input + "\uf8ff") // uf8ff is the last utf char
    .limitToFirst(5)
    .once("value", ss => {
      const incomingData = ss.val();
      if (incomingData) {
        const outgoingData = Object.keys(incomingData)
          .filter(k => incomingData[k].uid !== uid)
          .map(k => incomingData[k].public);
        res.json(outgoingData);
      } else {
        res.send(null);
      }
    })
    .catch(e => {
      res.status(503).send("service failure");
    });
};

export default queryUsersFn;
