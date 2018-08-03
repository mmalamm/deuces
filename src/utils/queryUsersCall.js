import { query_users } from "./api";
import axios from "axios";
import { auth } from "../fire";

const queryUsersCall = async input => {
  const idToken = await auth.currentUser.getIdToken(true);
  return new Promise((resolve, reject) => {
    axios.post(query_users, { input, idToken }).then(({ data }) => {
      resolve(data);
    });
  });
};

export default queryUsersCall;
