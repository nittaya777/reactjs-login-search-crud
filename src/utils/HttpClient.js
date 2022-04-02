import axios from "axios";
import join from "url-join";
import {
  API_BASE_URL,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
  server
} from "../Constants";
import TokenService from "./TokenService";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  let config_url = config.url;
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(API_BASE_URL, config.url);
  }
  // console.log('url->',config_url);
  if(config_url === server.REFRESH_TOKEN_URL || config_url === server.LOGOUT_URL){
    // console.log('in re token')
    const token = TokenService.getLocalRefreshToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
  }else{
    // console.log('else not re token')
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
  }
  

  config.timeout = 10000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // debugger;
    console.log(error.config);
    const originalConfig = error.config;

    if (originalConfig.url !== server.LOGIN_URL && originalConfig.url !== server.LOGOUT_URL && error.response) {
      // Access Token was expired
      if (error.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          // console.log("access-token : ", TokenService.getLocalAccessToken());
          // console.log("refresh-token : ", TokenService.getLocalRefreshToken());
          
          const rs = await axios.post("auth/refreshtoken");

          const { token } = rs.data;
          //
          TokenService.updateLocalAccessToken(token);

          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }else if(error.response.status === 400 && !originalConfig._retry){
        return Promise.reject({
          code: 400,
          status: 400,
          message: 'new login page',
        });
      }
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
