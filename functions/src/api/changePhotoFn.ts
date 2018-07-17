import { db, keyify } from "../admin";

const changePhotoFn = async (req, res) => {
  const { downloadURL } = req.body;
  const { uid, username } = req;

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
