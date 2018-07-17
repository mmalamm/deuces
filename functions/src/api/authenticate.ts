import { getUidFromToken, getUsernameFromUid } from "../admin";

export default async (req, res, next) => {
  const { idToken } = req.body;
  if (idToken) {
    const uid = await getUidFromToken(idToken);
    const username = await getUsernameFromUid(uid);
    req.uid = uid;
    req.username = username;
    console.log(`Authenticated user ${username} (uid: ${uid})`);
    next();
  } else {
    console.log("there is no id Token!!");
    next();
  }
};
