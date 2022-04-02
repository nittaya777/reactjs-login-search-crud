import {
    HTTP_PROFILE_FETCHING,
    HTTP_PROFILE_FETCHED,
    HTTP_PROFILE_FAILED,
    server,
  } from "../Constants";
  import { httpClient } from "../utils/HttpClient";
  import {logout} from "./loginAction"
  
  export const profile_fetching = () => {
    return {
      type: HTTP_PROFILE_FETCHING,
    };
  };
  export const profile_fetched = (payload) => {
    return {
      type: HTTP_PROFILE_FETCHED,
      payload: payload,
    };
  };
  export const profile_failed = () => {
    return {
      type: HTTP_PROFILE_FAILED,
    };
  };
  

  export const getProfileById = (id,navigate)=>{
    return async (dispatch, getState) => {
      dispatch(profile_fetching());
      try {
        let data = await httpClient.get(`${server.USER_URL}/${id}`, {});
        if (data.status === 200) {
          dispatch(profile_fetched(data.data));
        } else {
          throw new Error("Error");
        }
      } catch (err) {
        if(err.status===400){
          dispatch(profile_failed());
          dispatch(logout(navigate))
        }else{
          dispatch(profile_failed());
        }
        
      }
    };
  }