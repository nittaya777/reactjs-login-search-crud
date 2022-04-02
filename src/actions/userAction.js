import {
  HTTP_USER_FETCHING,
  HTTP_USER_FETCHED,
  HTTP_USER_FAILED,
  server,
} from "../Constants";
import { httpClient } from "../utils/HttpClient";

export const user_fetching = () => {
  return {
    type: HTTP_USER_FETCHING,
  };
};
export const user_fetched = (payload) => {
  return {
    type: HTTP_USER_FETCHED,
    payload: payload,
  };
};
export const user_failed = () => {
  return {
    type: HTTP_USER_FAILED,
  };
};

export const search = (params) => {
  return async (dispatch, getState) => {
    dispatch(user_fetching());
    try {
      let payload = {
        page: params?.page || 1,
        size: params?.size || 20,
        keyword: params?.keyword || null
      };
      // let headers = authHeader();
      let data = await httpClient.get(server.USER_SEARCH_URL, {
        // headers: headers,
        params: payload,
      });
      if (data.status === 200) {
        dispatch(user_fetched(data.data));
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      dispatch(user_failed());
    }
  };
};
export const getUserById = (id)=>{
  return async (dispatch, getState) => {
    dispatch(user_fetching());
    try {
      let data = await httpClient.get(`${server.USER_URL}/${id}`, {});
      if (data.status === 200) {
        dispatch(user_fetched(data.data));
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      dispatch(user_failed());
    }
  };
}
export const updateAvatar = (form)=>{
  return async (dispatch, getState) =>{
    dispatch(user_fetching());
    try{
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      let result = await httpClient.put(`${server.USER_UPDATE_AVATAR_URL}`,form,config);
      if(result.status===200){
        dispatch(user_fetched(result.data));//data ชุดใหม่
      }else{
        throw new Error("Error");
      }
    }catch(error){
      console.log(error)
      dispatch(user_failed())
    }
  }
}