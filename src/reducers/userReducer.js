import {
  HTTP_USER_FETCHING,
  HTTP_USER_FETCHED,
  HTTP_USER_FAILED,
} from "../Constants";
const initialState = {
  data: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_USER_FETCHING:
      return Object.assign({}, state, {
        data: null,
        isFetching: true,
        isError: false,
      });
    case HTTP_USER_FETCHED:
      return Object.assign({}, state, {
        data: payload,
        isFetching: false,
        isError: false,
      });
    case HTTP_USER_FAILED:
      return Object.assign({}, state, {
        data: null,
        isFetching: false,
        isError: true,
      });
    default:
      return state;
  }
};
