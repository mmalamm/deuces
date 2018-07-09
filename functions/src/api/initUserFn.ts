import { getUserFromUsername, setUsernameAndCreateUser } from "../admin";

const isValidUsername = (uname: string): boolean =>
  !!uname.toLowerCase().match(/^[a-z0-9]{4,20}$/);

const initUserFn = async (req, res) => {
  const { idToken, username } = req.body;
  const { uid } = req;
  const user = await getUserFromUsername(username);

  if (user) {
    return res.status(412).send("username already exists");
  }

  if (!isValidUsername(username)) {
    return res.status(417).send("username is invalid");
  }

  setUsernameAndCreateUser(username, uid)
    .then(_user => {
      res.json(_user);
    })
    .catch(e => {
      res.status(400).send("something went wrong");
    });
};

export default initUserFn;
