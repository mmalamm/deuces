import { db } from '../admin'

const queryUsersDbFn = (req, res) => {
  const { input } = req.body;
  /// need to build this out into an endpoint to improve newGameForm UI
  db
    .ref()
    .child("users")
    .orderByKey()
    .startAt(input)
    .endAt(input + "\uf8ff") // uf8ff is the last utf char
    .once("value", ss => {
      const incomingData = ss.val();
      if (incomingData) {
        const outgoingData = Object.keys(incomingData).map(k => incomingData[k].public);
        res.json(outgoingData);
      } else {
        res.send(null);
      }
    })
    .catch(e => {
      res.status(503).send('service failure')
    });
};

export default queryUsersDbFn;