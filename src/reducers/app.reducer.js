import { APP_INIT } from "../Constants";

const initialState = {
  app: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_INIT:
      return { ...state, app: payload };

    default:
      return state;
  }
};
