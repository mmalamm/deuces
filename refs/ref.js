const express = require("express");
const cors = require("cors");
import admin from "./admin";

const app = express();

app.use(cors());
app.post("/init_user", async (req, res) => {
  const { idToken, username } = req.body;
  const token = await admin.auth().verifyIdToken(idToken);
  const uid = token.uid;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(token => {
      const uid = token.uid;
      Promise.all([
        admin
          .database()
          .ref(`/_users/${uid}/username`)
          .set(username),
        admin
          .database()
          .ref(`users/${username}`)
          .set({ uid })
      ])
        .then(() => {
          admin
            .database()
            .ref(`/_users/${uid}`)
            .once("value", snapshot => {
              res.json(snapshot.val());
            })
            .catch(error => {
              console.error(error);
              res.json(error);
            });
        })
        .catch(error => {
          console.error(error);
          res.json(error);
        });
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
});

export default app;
