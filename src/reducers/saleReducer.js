import {
    HTTP_ORDER_FETCHING,
  HTTP_ORDER_FETCHED,
  HTTP_ORDER_FAILED,
  } from "../Constants";
  const initialState = {
    data: null,
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_ORDER_FETCHING:
        return Object.assign({}, state, {
          data: null,
          isFetching: true,
          isError: false,
        });
      case HTTP_ORDER_FETCHED:
        return Object.assign({}, state, {
          data: payload,
          isFetching: false,
          isError: false,
        });
      case HTTP_ORDER_FAILED:
        return Object.assign({}, state, {
          data: null,
          isFetching: false,
          isError: true,
        });
      default:
        return state;
    }
  };
  