import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  HTTP_LOGOUT,
  ACCESS_TOKEN_NAME,
  server,
  YES
} from "../Constants";
import { httpClient } from "../utils/HttpClient";
import TokenService from "../utils/TokenService";

export const login_fetching = () => {
  return {
    type: HTTP_LOGIN_FETCHING,
  };
};
export const login_success = (payload) => {
  return {
    type: HTTP_LOGIN_SUCCESS,
    payload: payload,
  };
};
export const login_failed = () => {
  return {
    type: HTTP_LOGIN_FAILED,
  };
};

export const state_logout = () => {
  return {
    type: HTTP_LOGOUT,
  };
};

export const logout=(navigate)=>{
  return async(dispatch, getState)=>{
    TokenService.removeUser();
    dispatch(state_logout())
    getState().appReducer.app.forceUpdate();
    await httpClient.delete(server.LOGOUT_URL)
    navigate("/login");
  }
}
export const auto_login = (navigate) => {
  return () => {
    if (localStorage.getItem(server.LOGIN_PASSED) === YES) {
      setTimeout(() => {
        navigate("/home")
      }, 100);
    }
  };
};
export const action_login = (navigate, credential) => {
  const { username, password } = credential;
  const new_username = username.replace(/\s/g, "");
  const new_password = password.replace(/\s/g, "");
  const payload = {
    username: new_username,
    password: new_password,
  };

  return async(dispatch, getState) => {
    dispatch(login_fetching());
      try{
        let data = await httpClient.post(server.LOGIN_URL, payload)
        if(data.status===200){
            localStorage.setItem(server.LOGIN_PASSED, YES);
            // localStorage.setItem(ACCESS_TOKEN_NAME,data.data.token);
            TokenService.setUser(data.data);
            dispatch(login_success(data.data))
            getState().appReducer.app.forceUpdate();
            navigate("/home")
        }else{
            throw new Error("Error");
        }
    } catch (error) {
      console.log(error)
        dispatch(login_failed());
      }
    
  };
};
