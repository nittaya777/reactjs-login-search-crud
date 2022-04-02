import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  HTTP_LOGOUT,
} from "../Constants";

const initialState = {
  data: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState,  { type, payload }) => {
  switch (type) {
    case HTTP_LOGIN_FETCHING:
      return Object.assign({}, state, {
        data: null,
        isFetching: true,
        isError: false,
      });
    case HTTP_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        data: payload,
        isFetching: false,
        isError: false,
      });
    case HTTP_LOGIN_FAILED:
      return Object.assign({}, state, {
        data: null,
        isFetching: false,
        isError: true,
      });
    case HTTP_LOGOUT:
      return Object.assign({}, state, {
        data: null,
        isFetching: false,
        isError: false,
      });
    default:
      return state;
  }
};
