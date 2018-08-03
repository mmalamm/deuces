const isDevServer = true;
// const isDevServer = false;

const devURL = "http://localhost:5000/deuces-bovinecorvus/us-central1/api";
const prodURL =
  "https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api";
const baseURL = isDevServer ? devURL : prodURL;

const endpoints = [
  "create_game",
  "init_user",
  "change_photo",
  "query_users",
  "delete_game"
];

const o = endpoints.reduce((acc, endpoint) => {
  acc[endpoint] = `${baseURL}/${endpoint}`;
  return acc;
}, {});

export const {
  create_game,
  init_user,
  change_photo,
  query_users,
  delete_game
} = o;
