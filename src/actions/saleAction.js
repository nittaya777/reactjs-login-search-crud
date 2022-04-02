import {
  HTTP_ORDER_FETCHING,
  HTTP_ORDER_FETCHED,
  HTTP_ORDER_FAILED,
  server,
} from "../Constants";
import { httpClient } from "../utils/HttpClient";

export const order_fetching = () => {
  return {
    type: HTTP_ORDER_FETCHING,
  };
};
export const order_fetched = (payload) => {
  return {
    type: HTTP_ORDER_FETCHED,
    payload: payload,
  };
};
export const order_failed = () => {
  return {
    type: HTTP_ORDER_FAILED,
  };
};

export const search = (params) => {
  return async (dispatch, getState) => {
    dispatch(order_fetching());
    try {
      let payload = {
        page: params?.page || 1,
        size: params?.size || 20,
        keyword: params?.keyword || null,
        type: params?.type || null,
        date_from: params?.date_from || null,
        date_to: params?.date_to || null,
      };
      // let headers = authHeader();
      let data = await httpClient.get(server.ORDER_SEARCH_URL, {
        // headers: headers,
        params: payload,
      });
      if (data.status === 200) {
        dispatch(order_fetched(data.data));
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      dispatch(order_failed());
    }
  };
};
export const getOrderById = (id) => {
  return async (dispatch, getState) => {
    dispatch(order_fetching());
    try {
      let data = await httpClient.get(`${server.ORDER_URL}/${id}`, {});
      if (data.status === 200) {
        dispatch(order_fetched(data.data));
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      dispatch(order_failed());
    }
  };
};
