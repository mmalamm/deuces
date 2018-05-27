const express = require("express");
const cors = require("cors");

import initUserFn from "./initUserFn";
import changePhotoUrlFn from "./changePhotoUrlFn";
import createGameFn from "./createGameFn";

const app = express();

app.use(cors());
app.post("/init_user", initUserFn);
app.post("/change_photo_url", changePhotoUrlFn);
app.post("/create_game", createGameFn);

export default app;
