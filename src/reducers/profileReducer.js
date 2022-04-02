import {
    HTTP_PROFILE_FETCHING,
    HTTP_PROFILE_FETCHED,
    HTTP_PROFILE_FAILED,
  } from "../Constants";
  const initialState = {
    data: null,
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_PROFILE_FETCHING:
        return Object.assign({}, state, {
          data: null,
          isFetching: true,
          isError: false,
        });
      case HTTP_PROFILE_FETCHED:
        return Object.assign({}, state, {
          data: payload,
          isFetching: false,
          isError: false,
        });
      case HTTP_PROFILE_FAILED:
        return Object.assign({}, state, {
          data: null,
          isFetching: false,
          isError: true,
        });
      default:
        return state;
    }
  };
  