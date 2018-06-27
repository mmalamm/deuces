const isDevServer = true;
// const isDevServer = false;

const devURL = "http://localhost:5000/deuces-bovinecorvus/us-central1/api"
const prodURL = "https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api"
const baseURL = isDevServer ? devURL : prodURL;

export const createGameEndpoint = baseURL + "/create_game";
export const initUserEndpoint = baseURL + "/init_user";
export const changePhotoURLendpoint = baseURL + "/change_photo_url";
export const queryUsersEndpoint = baseURL + "/query_users";
