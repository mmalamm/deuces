// import express from "express";
const express = require("express");
const cors = require("cors");
// import cors from "cors";
import admin from "./admin";

const app = express();

app.use(cors());
// app.use(cors({ origin: true }));
app.post("/init_user", (req, res) => {
  // console.log(req);
  const { idToken, username } = req.body;
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
