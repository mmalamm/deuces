import { getUserFromUsername, setUsernameAndCreateUser } from "../admin";
// import { getUserFromUsername, setUsernameAndCreateUser } from "./index";
import { Handler } from "express";

const isValidUsername = (uname: string): boolean =>
  !!uname.toLowerCase().match(/^[a-z0-9]{4,20}$/);

const initUserFn: Handler = async (req, res) => {
  const { username, uid } = req.body;
  const user = await getUserFromUsername(username);

  if (user) {
    return res.status(412).send("username already exists");
  }

  if (!isValidUsername(username)) {
    return res.status(417).send("username is invalid");
  }

  return setUsernameAndCreateUser(username, uid)
    .then(_user => {
      res.json(_user);
    })
    .catch(e => {
      res.status(400).send("something went wrong");
    });
};

export default initUserFn;
