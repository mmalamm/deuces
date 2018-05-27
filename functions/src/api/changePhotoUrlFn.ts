import { getUidFromToken, db, getUsernameFromUid, keyify } from "../admin";

const changePhotoUrlFn = async (req, res) => {
  const { idToken, downloadURL } = req.body;
  const uid = await getUidFromToken(idToken);
  const username = await getUsernameFromUid(uid);

  const p1 = db
    .ref(`users/${keyify(username)}/public/photoURL`)
    .set(downloadURL);
  const p2 = db
    .ref(`/_users/${uid}`)
    .child("photoURL")
    .set(downloadURL);

  Promise.all([p1, p2])
    .then(() => {
      res.json({ status: 200, desc: "A okay!", downloadURL });
    })
    .catch(e => console.error(e));
};

export default changePhotoUrlFn;
