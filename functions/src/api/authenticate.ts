import { getUidFromToken } from "../admin";
import { Handler } from "express";

const authFn: Handler = async (req, res, next) => {
  const { idToken } = req.body;
  if (idToken) {
    const uid = await getUidFromToken(idToken);
    req.body.uid = uid;
    console.log(`Authenticated user (uid: ${uid})`);
    next();
  } else {
    console.log("there is no id Token!!");
    next();
  }
};

export default authFn;
