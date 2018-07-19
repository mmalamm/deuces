import { db, keyify, getUsernameFromUid } from "../admin";

const changePhotoFn = async (req, res) => {
  const { downloadURL, uid } = req.body;
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

export default changePhotoFn;
