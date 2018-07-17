const express = require("express");
const cors = require("cors");

import initUserFn from "./initUserFn";
import changePhotoFn from "./changePhotoFn";
import createGameFn from "./createGameFn";
import joinGameFn from "./joinGameFn";
import queryUsersFn from "./queryUsersFn";
import authenticate from "./authenticate";
import deleteGameFn from "./deleteGameFn";

const app = express();

app.use(cors());
app.use(authenticate);
app.post("/init_user", initUserFn);
app.post("/change_photo", changePhotoFn);
app.post("/create_game", createGameFn);
app.post("/join_game", joinGameFn);
app.post("/query_users", queryUsersFn);
app.post("/delete_game", deleteGameFn);

export default app;
