const express = require("express");
const cors = require("cors");

import initUserFn from "./initUserFn";
import changePhotoUrlFn from "./changePhotoUrlFn";
import createGameFn from "./createGameFn";
import joinGameFn from "./joinGameFn";
import queryUsersDbFn from "./queryUsersDbFn";

const app = express();

app.use(cors());
app.post("/init_user", initUserFn);
app.post("/change_photo_url", changePhotoUrlFn);
app.post("/create_game", createGameFn);
app.post("/join_game", joinGameFn);
app.post('/query_users', queryUsersDbFn);

export default app;
