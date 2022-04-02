import { server,ACCESS_TOKEN_NAME } from "../Constants";

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME));
  return user?.token;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME));
  // console.log('set old:',user);
  // console.log('set new:',token);
  user.token = token;
  localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(user));
};

const getUser = () => {
  try{
    return JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME));
  }catch{
    return null
  }
};

const setUser = (user) => {
  // console.log(JSON.stringify(user));
  localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
  localStorage.removeItem(server.LOGIN_PASSED);
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
