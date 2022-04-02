import { APP_INIT } from "../Constants";

export const setApp = (app) => {
  return (dispatch) => {
    dispatch({
      type: APP_INIT,
      payload: app,
    });
  };
};
