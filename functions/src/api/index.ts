const express = require("express");
const cors = require("cors");

import { Application } from "express";

import initUserFn from "./initUserFn";
import changePhotoFn from "./changePhotoFn";
import createGameFn from "./createGameFn";
import joinGameFn from "./joinGameFn";
import queryUsersFn from "./queryUsersFn";
import authenticate from "./authenticate";
import deleteGameFn from "./deleteGameFn";

import registerRoutes from "../helpers/registerRoutes";

const routes = {
  init_user: initUserFn,
  change_photo: changePhotoFn,
  create_game: createGameFn,
  join_game: joinGameFn,
  query_users: queryUsersFn,
  delete_game: deleteGameFn
};

const app: Application = express();

app.use(cors());
app.use(authenticate());
registerRoutes(app, routes);

export default app;
