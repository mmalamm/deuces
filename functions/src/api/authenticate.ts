import { getUidFromToken } from "../admin";

export default async (req, res, next) => {
  const { idToken } = req.body;
  if (idToken) {
    const uid = await getUidFromToken(idToken);
    req.uid = uid;
    console.log(`Authenticated user (uid: ${uid})`);
    next();
  } else {
    console.log("there is no id Token!!");
    next();
  }
};
