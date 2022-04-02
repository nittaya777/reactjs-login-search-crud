import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import saleReducer from "./saleReducer";
export default combineReducers({
  appReducer,
  loginReducer,
  userReducer,
  profileReducer,
  saleReducer
});
